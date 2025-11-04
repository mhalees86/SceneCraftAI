import { useState } from "react";
import { FavoritesSection } from "@/components/favorites-section";
import type { Favorite } from "@shared/schema";
import { useLocation } from "wouter";

export default function Favorites() {
  const [, navigate] = useLocation();
  const [favorites, setFavorites] = useState<Favorite[]>([
    //todo: remove mock data
    {
      id: '1',
      name: 'Cinematic Sunset',
      description: 'Beautiful golden hour scene with dramatic lighting',
      parameters: {
        tone: 'Dramatic',
        timeOfDay: 'Golden Hour',
        lighting: 'Natural',
        mood: 'Calm',
      },
      tags: ['cinematic', 'sunset', 'nature'],
      createdAt: new Date().toISOString(),
    }
  ]);

  const handleAddFavorite = (favorite: Omit<Favorite, 'id' | 'createdAt'>) => {
    const newFavorite: Favorite = {
      ...favorite,
      id: String(Date.now()),
      createdAt: new Date().toISOString(),
    };
    setFavorites([...favorites, newFavorite]);
  };

  const handleDeleteFavorite = (id: string) => {
    setFavorites(favorites.filter((fav) => fav.id !== id));
  };

  const handleLoadFavorite = () => {
    navigate('/');
  };

  return (
    <div className="h-full overflow-auto p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Favorites</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Save and organize your best prompts and parameter presets
          </p>
        </div>

        <FavoritesSection
          favorites={favorites}
          onAddFavorite={handleAddFavorite}
          onDeleteFavorite={handleDeleteFavorite}
          onLoadFavorite={handleLoadFavorite}
        />
      </div>
    </div>
  );
}
