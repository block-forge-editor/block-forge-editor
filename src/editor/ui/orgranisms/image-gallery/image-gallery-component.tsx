import { FC, useCallback, useRef, useState } from "react";
import { Upload, Link, ImageIcon } from "lucide-react";
import { ComponentHeader } from "@/editor/ui/molecules/component-header";
import { Input } from "@/editor/ui/shadcn/ui/input";
import { Button } from "@/editor/ui/shadcn/ui/button";
import { GridGallery, CarouselGallery } from "./gallery-variants";

type TImageGalleryComponentProps = {
  onImageAdd: (data: { url: string; alt: string; caption?: string }) => void;
  onImageDelete: (id: string) => void;
  variant: "primary" | "secondary";
  images: Array<{
    id: string;
    url: string;
    alt: string;
    caption?: string;
  }>;
  onImageUpdate: (
    id: string,
    data: {
      url: string;
      alt?: string;
      caption?: string;
    },
  ) => void;
  onMetaDataChange: (data: {
    id: string;
    data: {
      alt?: string;
      caption?: string;
    };
  }) => void;
};

export const ImageGalleryComponent: FC<TImageGalleryComponentProps> = ({
  images,
  variant,
  onImageAdd,
  onImageDelete,
  onImageUpdate,
  onMetaDataChange,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [urlInput, setUrlInput] = useState("");

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      onImageAdd({
        url: base64String,
        alt: file.name,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleUrlAdd = () => {
    if (urlInput.trim()) {
      onImageAdd({
        url: urlInput.trim(),
        alt: "",
      });
      setUrlInput("");
    }
  };

  const handleEditUrl = (url: string) => {
    setUrlInput(url);
  };

  const renderGallery = useCallback(() => {
    const commonProps = {
      images,
      onImageDelete,
      onImageUpdate,
      onMetaDataChange,
      onEditUrl: handleEditUrl,
    };

    switch (variant) {
      case "primary":
        return <GridGallery {...commonProps} />;
      case "secondary":
        return <CarouselGallery {...commonProps} />;
    }
  }, [images, variant, onImageDelete, onImageUpdate, handleEditUrl]);

  return (
    <div className="bf-relative bf-group bf-w-full bf-space-y-4">
      <ComponentHeader
        title="Image Gallery"
        tooltipText="Component for displaying image galleries"
      />

      <div className="bf-mt-4 bf-flex bf-flex-col bf-gap-4">
        <div className="bf-flex bf-items-center bf-gap-2 bf-group/item">
          <Input
            type="text"
            value={urlInput}
            className="bf-flex-1"
            placeholder="Enter image URL"
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleUrlAdd();
              }
            }}
          />
          <Button size="icon" variant="outline" onClick={handleUrlAdd}>
            <Link className="bf-size-4" />
          </Button>

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

        {!!images?.length ? (
          renderGallery()
        ) : (
          <div className="bf-flex bf-flex-col bf-border-b bf-items-center bf-justify-center bf-h-[200px] bf-text-gray-400">
            <ImageIcon className="bf-size-8 bf-mb-2" />
            <span>No image added</span>
          </div>
        )}
      </div>
    </div>
  );
};
