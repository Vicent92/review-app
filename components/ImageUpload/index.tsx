import type React from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
  label: string;
}

export function ImageUpload({ onImageUpload, label }: ImageUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Error",
          description:
            "El archivo es demasiado grande. El tamaño máximo es 5MB.",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      onImageUpload(file);
    }
  };

  return (
    <div className="space-y-4">
      <Label htmlFor="image-upload">{label}</Label>
      <div className="flex items-center space-x-4">
        <Input
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full"
        />
      </div>
      {previewUrl && (
        <div className="mt-4">
          <img
            src={previewUrl || "/placeholder.svg"}
            alt="Preview"
            className="max-w-full h-auto rounded-lg"
          />
        </div>
      )}
    </div>
  );
}
