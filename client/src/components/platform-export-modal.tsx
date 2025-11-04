import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Copy, Check } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface Platform {
  id: string;
  name: string;
  url: string;
  description: string;
}

const platforms: Platform[] = [
  {
    id: 'veo3',
    name: 'Google Veo 3',
    url: 'https://deepmind.google/technologies/veo/',
    description: 'Latest AI video generation model from Google'
  },
  {
    id: 'sora2',
    name: 'OpenAI Sora 2',
    url: 'https://openai.com/sora',
    description: 'Advanced text-to-video AI model'
  },
  {
    id: 'runway',
    name: 'Runway Gen-3',
    url: 'https://runwayml.com/',
    description: 'Professional AI video generation'
  },
  {
    id: 'pika',
    name: 'Pika Labs',
    url: 'https://pika.art/',
    description: 'Creative video generation platform'
  },
  {
    id: 'stability',
    name: 'Stability AI',
    url: 'https://stability.ai/',
    description: 'Stable Video Diffusion'
  }
];

interface PlatformExportModalProps {
  open: boolean;
  onClose: () => void;
  prompt: string;
}

export function PlatformExportModal({ open, onClose, prompt }: PlatformExportModalProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { toast } = useToast();

  const handleCopyAndOpen = async (platform: Platform) => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopiedId(platform.id);
      
      toast({
        title: "Prompt copied!",
        description: `Opening ${platform.name}...`,
      });

      setTimeout(() => {
        window.open(platform.url, '_blank');
        setCopiedId(null);
      }, 500);
    } catch (error) {
      console.error('Failed to copy:', error);
      toast({
        title: "Error",
        description: "Failed to copy prompt to clipboard",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Send to AI Platform</DialogTitle>
          <DialogDescription>
            Copy your prompt and open your preferred AI video platform
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          {platforms.map((platform) => (
            <Card key={platform.id} className="hover-elevate">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-base">{platform.name}</h3>
                    <p className="text-sm text-muted-foreground">{platform.description}</p>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full gap-2"
                    onClick={() => handleCopyAndOpen(platform)}
                    data-testid={`button-platform-${platform.id}`}
                  >
                    {copiedId === platform.id ? (
                      <>
                        <Check className="h-4 w-4" />
                        Copied! Opening...
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        <ExternalLink className="h-4 w-4" />
                        Copy & Open
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
