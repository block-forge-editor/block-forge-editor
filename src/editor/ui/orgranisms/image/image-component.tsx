import { FC, useRef, useState } from "react";

import { Upload, Image as ImageIcon } from "lucide-react";

import { ComponentHeader } from "@/editor/ui/molecules/component-header";
import { Button } from "@/editor/ui/shadcn/ui/button";
import { Input } from "@/editor/ui/shadcn/ui/input";

type TImageComponentProps = {
  url: string;
  caption?: string;
  variant: "primary" | "secondary";
  onUpdate: (data: { url: string; caption?: string }) => void;
};

export const ImageComponent: FC<TImageComponentProps> = ({
  url,
  caption,
  variant,
  onUpdate,
}) => {
  const [localUrl, setLocalUrl] = useState(url);
  const [localCaption, setLocalCaption] = useState(caption || "");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUrlChange = (value: string) => {
    setLocalUrl(value);
    onUpdate({ url: value, caption: localCaption });
  };

  const handleCaptionChange = (value: string) => {
    setLocalCaption(value);
    onUpdate({ url: localUrl, caption: value });
  };

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setLocalUrl(base64String);
      onUpdate({ url: base64String, caption: localCaption });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="bf-relative bf-group bf-w-full bf-space-y-4">
      <ComponentHeader
        title="Image"
        variant={variant}
        tooltipText="Component for displaying images with captions"
      />

      <div className="bf-min-h-[200px]">
        <div className="bf-flex bf-flex-col bf-gap-4">
          <div className="bf-flex bf-items-center bf-gap-2 bf-group/item">
            <Input
              type="text"
              value={localUrl}
              className="bf-flex-1"
              placeholder="Enter image URL"
              onChange={(e) => handleUrlChange(e.target.value)}
            />
            <input
              type="file"
              accept="image/*"
              className="bf-hidden"
              ref={fileInputRef}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  handleFileUpload(file);
                }
              }}
            />
            <Button
              size="icon"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="bf-size-4" />
            </Button>
          </div>
          {localUrl ? (
            <div className="bf-flex bf-flex-col bf-gap-4">
              <div className="bf-relative bf-aspect-video bf-w-full bf-overflow-hidden bf-rounded-lg">
                <img
                  src={localUrl}
                  alt={localCaption || "Image"}
                  className="bf-object-cover bf-w-full bf-h-full"
                />
              </div>
              <Input
                type="text"
                className="bf-text-sm"
                value={localCaption}
                placeholder="Add a caption..."
                onChange={(e) => handleCaptionChange(e.target.value)}
              />
            </div>
          ) : (
            <div className="bf-flex bf-flex-col bf-items-center bf-justify-center bf-h-[200px] bf-text-gray-400">
              <ImageIcon className="bf-size-8 bf-mb-2" />
              <span>No image URL entered</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
