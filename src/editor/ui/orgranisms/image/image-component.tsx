import { FC, useRef, useState } from "react";

import { Upload, Image as ImageIcon } from "lucide-react";

import { ComponentHeader } from "@/editor/ui/molecules/component-header";
import { Button } from "@/editor/ui/shadcn/ui/button";
import { Input } from "@/editor/ui/shadcn/ui/input";

type TImageComponentProps = {
  url: string;
  caption?: string;
  alt: string;
  onUpdate: (data: { url: string; caption?: string; alt: string }) => void;
};

export const ImageComponent: FC<TImageComponentProps> = ({
  url,
  caption,
  alt,
  onUpdate,
}) => {
  const [localUrl, setLocalUrl] = useState(url);
  const [localCaption, setLocalCaption] = useState(caption || "");
  const [localAlt, setLocalAlt] = useState(alt || "");
  const [previewUrl, setPreviewUrl] = useState(url);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUrlChange = (value: string) => {
    setLocalUrl(value);
    setPreviewUrl(value);
    onUpdate({
      url: value,
      caption: localCaption,
      alt: localAlt,
    });
  };

  const handleCaptionChange = (value: string) => {
    setLocalCaption(value);
    onUpdate({
      url: previewUrl,
      caption: value,
      alt: localAlt,
    });
  };

  const handleAltChange = (value: string) => {
    setLocalAlt(value);
    onUpdate({
      url: previewUrl,
      caption: localCaption,
      alt: value,
    });
  };

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      const img = new window.Image();
      img.onload = () => {
        setPreviewUrl(base64String);
        onUpdate({
          url: base64String,
          caption: localCaption,
          alt: localAlt,
        });
      };
      img.src = base64String;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="bf-relative bf-group bf-w-full bf-space-y-4">
      <ComponentHeader
        title="Image"
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
          {previewUrl ? (
            <div className="bf-flex bf-flex-col bf-gap-4">
              <div className="bf-relative bf-aspect-video bf-w-full bf-overflow-hidden bf-rounded-lg">
                <img
                  src={previewUrl}
                  alt={localAlt}
                  className="bf-object-cover bf-w-full bf-h-full"
                />
              </div>
              <Input
                type="text"
                className="bf-text-sm"
                value={localAlt}
                placeholder="Add alt text..."
                onChange={(e) => handleAltChange(e.target.value)}
              />
              <Input
                type="text"
                className="bf-text-sm"
                value={localCaption}
                placeholder="Add a caption..."
                onChange={(e) => handleCaptionChange(e.target.value)}
              />
            </div>
          ) : (
            <div className="bf-flex bf-border-b bf-flex-col bf-items-center bf-justify-center bf-h-[200px] bf-text-gray-400">
              <ImageIcon className="bf-size-8 bf-mb-2" />
              <span>No image added</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
