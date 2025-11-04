import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Star, Trash2, Copy, Search, Plus, X } from "lucide-react";
import { useState } from "react";
import type { Favorite, SceneParameters } from "@shared/schema";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface FavoritesSectionProps {
  favorites: Favorite[];
  onAddFavorite: (favorite: Omit<Favorite, 'id' | 'createdAt'>) => void;
  onDeleteFavorite: (id: string) => void;
  onLoadFavorite: (favorite: Favorite) => void;
  currentParameters?: SceneParameters;
  currentPrompt?: string;
}

export function FavoritesSection({
  favorites,
  onAddFavorite,
  onDeleteFavorite,
  onLoadFavorite,
  currentParameters,
  currentPrompt
}: FavoritesSectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [newFavoriteName, setNewFavoriteName] = useState('');
  const [newFavoriteDescription, setNewFavoriteDescription] = useState('');
  const [newFavoriteTags, setNewFavoriteTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

  const filteredFavorites = favorites.filter((fav) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      fav.name.toLowerCase().includes(searchLower) ||
      fav.description?.toLowerCase().includes(searchLower) ||
      fav.tags.some((tag) => tag.toLowerCase().includes(searchLower))
    );
  });

  const handleSaveFavorite = () => {
    if (!newFavoriteName.trim()) return;

    onAddFavorite({
      name: newFavoriteName,
      description: newFavoriteDescription,
      parameters: currentParameters || {},
      prompt: currentPrompt,
      tags: newFavoriteTags,
    });

    setShowSaveDialog(false);
    setNewFavoriteName('');
    setNewFavoriteDescription('');
    setNewFavoriteTags([]);
  };

  const addTag = () => {
    if (tagInput.trim() && !newFavoriteTags.includes(tagInput.trim())) {
      setNewFavoriteTags([...newFavoriteTags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setNewFavoriteTags(newFavoriteTags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search favorites..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
            data-testid="input-search-favorites"
          />
        </div>
        <Button onClick={() => setShowSaveDialog(true)} data-testid="button-add-favorite">
          <Plus className="h-4 w-4 mr-2" />
          Save Current
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredFavorites.map((favorite) => (
          <Card key={favorite.id} className="hover-elevate">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-primary fill-primary" />
                  <CardTitle className="text-base">{favorite.name}</CardTitle>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7"
                    onClick={() => onLoadFavorite(favorite)}
                    data-testid={`button-load-${favorite.id}`}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7"
                    onClick={() => onDeleteFavorite(favorite.id)}
                    data-testid={`button-delete-${favorite.id}`}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {favorite.description && (
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {favorite.description}
                </p>
              )}
              {favorite.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {favorite.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
              <p className="text-xs text-muted-foreground">
                {new Date(favorite.createdAt).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredFavorites.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <Star className="h-12 w-12 mx-auto mb-4 opacity-20" />
          <p>No favorites found</p>
          <p className="text-sm">Save your best prompts and settings here</p>
        </div>
      )}

      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save as Favorite</DialogTitle>
            <DialogDescription>
              Save current settings and prompt for quick access later
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={newFavoriteName}
                onChange={(e) => setNewFavoriteName(e.target.value)}
                placeholder="My Cinematic Scene"
                data-testid="input-favorite-name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description (optional)</Label>
              <Textarea
                id="description"
                value={newFavoriteDescription}
                onChange={(e) => setNewFavoriteDescription(e.target.value)}
                placeholder="Description..."
                className="resize-none"
                rows={3}
                data-testid="input-favorite-description"
              />
            </div>
            <div className="space-y-2">
              <Label>Tags</Label>
              <div className="flex gap-2">
                <Input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  placeholder="Add tag..."
                  data-testid="input-favorite-tag"
                />
                <Button type="button" variant="outline" onClick={addTag}>
                  Add
                </Button>
              </div>
              {newFavoriteTags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {newFavoriteTags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="gap-1">
                      {tag}
                      <button onClick={() => removeTag(tag)} className="ml-1">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSaveDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveFavorite} disabled={!newFavoriteName.trim()} data-testid="button-save-favorite">
              Save Favorite
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
