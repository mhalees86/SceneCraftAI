import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Edit, RotateCw } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface OutputDisplayProps {
  prompt: string;
  onRegenerate?: () => void;
  onPromptChange?: (value: string) => void;
  isAiMode?: boolean;
}

export function OutputDisplay({ 
  prompt, 
  onRegenerate, 
  onPromptChange,
  isAiMode = false 
}: OutputDisplayProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPrompt, setEditedPrompt] = useState(prompt);
  const { toast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      toast({
        title: "Copied to clipboard",
        description: "The prompt has been copied successfully.",
      });
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleSaveEdit = () => {
    if (onPromptChange) {
      onPromptChange(editedPrompt);
    }
    setIsEditing(false);
  };

  const wordCount = prompt.split(/\s+/).filter(word => word.length > 0).length;

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold">Generated Prompt</CardTitle>
        <div className="flex items-center gap-2">
          {isEditing ? (
            <Button 
              size="sm" 
              onClick={handleSaveEdit}
              data-testid="button-save-edit"
            >
              Save
            </Button>
          ) : (
            <>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => {
                  setEditedPrompt(prompt);
                  setIsEditing(true);
                }}
                data-testid="button-edit"
              >
                <Edit className="h-4 w-4" />
              </Button>
              {isAiMode && onRegenerate && (
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={onRegenerate}
                  data-testid="button-regenerate"
                >
                  <RotateCw className="h-4 w-4" />
                </Button>
              )}
              <Button
                size="icon"
                variant="ghost"
                onClick={handleCopy}
                data-testid="button-copy"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-4">
        {isEditing ? (
          <Textarea
            value={editedPrompt}
            onChange={(e) => setEditedPrompt(e.target.value)}
            className="flex-1 font-mono text-sm resize-none"
            data-testid="input-edit-prompt"
          />
        ) : (
          <div 
            className="flex-1 font-mono text-sm p-4 rounded-lg bg-muted overflow-auto"
            data-testid="text-prompt"
          >
            {prompt || <span className="text-muted-foreground italic">No prompt generated yet</span>}
          </div>
        )}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span data-testid="text-word-count">{wordCount} words</span>
          <span data-testid="text-token-estimate">~{Math.ceil(wordCount * 1.3)} tokens</span>
        </div>
      </CardContent>
    </Card>
  );
}
