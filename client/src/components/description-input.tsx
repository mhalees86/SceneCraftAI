import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface DescriptionInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function DescriptionInput({ value, onChange, placeholder }: DescriptionInputProps) {
  const charCount = value.length;
  
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">Description</Label>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "Describe your scene in detail..."}
        className="min-h-32 resize-none"
        data-testid="input-description"
      />
      <div className="flex justify-between items-center">
        <p className="text-xs text-muted-foreground">
          Provide detailed information for better results
        </p>
        <p className="text-xs text-muted-foreground" data-testid="text-char-count">
          {charCount} characters
        </p>
      </div>
    </div>
  );
}
