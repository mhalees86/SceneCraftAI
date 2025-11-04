import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LucideIcon } from "lucide-react";

interface ParameterSelectProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  icon?: LucideIcon;
  placeholder?: string;
}

export function ParameterSelect({ 
  label, 
  value, 
  options, 
  onChange, 
  icon: Icon,
  placeholder = "Please select"
}: ParameterSelectProps) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium flex items-center gap-2">
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
        {label}
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full" data-testid={`select-${label.toLowerCase().replace(/\s+/g, '-')}`}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
