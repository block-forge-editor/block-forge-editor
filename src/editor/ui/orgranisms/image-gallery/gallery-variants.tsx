import { FC, useState } from "react";
import { Trash2, Pencil } from "lucide-react";
import { Input } from "@/editor/ui/shadcn/ui/input";
import { EditorButton } from "../../molecules";
import {
  Carousel,
  CarouselItem,
  CarouselNext,
  CarouselContent,
  CarouselPrevious,
} from "@/editor/ui/shadcn/ui/carousel";

type TGalleryImage = {
  id: string;
  url: string;
  alt: string;
  caption?: string;
};

type TGalleryVariantProps = {
  images: TGalleryImage[];
  onMetaDataChange: (data: {
    id: string;
    data: {
      alt?: string;
      caption?: string;
    };
  }) => void;
  onImageDelete: (id: string) => void;
  onImageUpdate: (
    id: string,
    data: {
      url: string;
      alt: string;
      caption?: string;
    },
  ) => void;
  onEditUrl: (url: string) => void;
};

const ImageCard: FC<{
  image: TGalleryImage;
  onDelete: (id: string) => void;
  onUpdate: (id: string, data: any) => void;
  onEditUrl: (url: string) => void;
  onMetaDataChange: (data: {
    id: string;
    data: {
      alt?: string;
      caption?: string;
    };
  }) => void;
}> = ({ image, onDelete, onEditUrl, onMetaDataChange }) => {
  const [altText, setAltText] = useState(image.alt || "");
  const [caption, setCaption] = useState(image.caption || "");

  const handleAltTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAltText(e.target.value);
    onMetaDataChange({
      id: image.id,
      data: { alt: e.target.value },
    });
  };

  const handleCaptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCaption(e.target.value);
    onMetaDataChange({
      id: image.id,
      data: { caption: e.target.value },
    });
  };

  return (
    <div className="bf-relative bf-group bf-flex bf-flex-col bf-gap-4 bf-group/item">
      <div className="bf-relative bf-aspect-video bf-w-full bf-overflow-hidden bf-rounded-lg">
        <img src={image.url} className="bf-object-cover bf-w-full bf-h-full" />
        <div className="bf-absolute bf-top-2 bf-right-2 bf-flex bf-gap-2">
          {!image.url.includes("data:image") && (
            <EditorButton
              variant="secondary"
              onClick={() => onEditUrl(image.url)}
            >
              <Pencil className="bf-size-4" />
            </EditorButton>
          )}
          <EditorButton variant="secondary" onClick={() => onDelete(image.id)}>
            <Trash2 className="bf-size-4" />
          </EditorButton>
        </div>
      </div>
      <Input
        type="text"
        value={altText}
        placeholder="Alt text"
        onChange={handleAltTextChange}
      />
      <Input
        type="text"
        value={caption}
        placeholder="Caption"
        onChange={handleCaptionChange}
      />
    </div>
  );
};

export const GridGallery: FC<TGalleryVariantProps> = ({
  images,
  onImageDelete,
  onImageUpdate,
  onEditUrl,
  onMetaDataChange,
}) => (
  <div className="bf-grid bf-grid-cols-2 bf-md:bf-grid-cols-3 bf-lg:bf-grid-cols-4 bf-gap-4">
    {images.map((image) => (
      <ImageCard
        key={image.id}
        image={image}
        onMetaDataChange={onMetaDataChange}
        onDelete={onImageDelete}
        onUpdate={onImageUpdate}
        onEditUrl={onEditUrl}
      />
    ))}
  </div>
);

export const CarouselGallery: FC<TGalleryVariantProps> = ({
  images,
  onImageDelete,
  onImageUpdate,
  onEditUrl,
  onMetaDataChange,
}) => (
  <Carousel className="bf-w-full">
    <CarouselContent>
      {images.map((image) => (
        <CarouselItem key={image.id}>
          <ImageCard
            image={image}
            onMetaDataChange={onMetaDataChange}
            onDelete={onImageDelete}
            onUpdate={onImageUpdate}
            onEditUrl={onEditUrl}
          />
        </CarouselItem>
      ))}
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
);
