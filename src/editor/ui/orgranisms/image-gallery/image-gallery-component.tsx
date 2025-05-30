import { FC, useState } from "react";

import { Plus, Image, Trash2, Pencil } from "lucide-react";

import { ComponentHeader } from "@/editor/ui/molecules/component-header";
import { AspectRatio } from "@/editor/ui/shadcn/ui/aspect-ratio";
import {
  Carousel,
  CarouselItem,
  CarouselNext,
  CarouselContent,
  CarouselPrevious,
} from "@/editor/ui/shadcn/ui/carousel";
import {
  ContextMenu,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuContent,
} from "@/editor/ui/shadcn/ui/context-menu";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/editor/ui/shadcn/ui/dialog";

type TImageGalleryComponentProps = {
  onImageAdd: () => void;
  onImageDelete: (id: string) => void;
  variant: "grid" | "masonry" | "carousel";
  images: Array<{
    id: string;
    url: string;
    alt: string;
    caption?: string;
  }>;
  onImageUpdate: (
    id: string,
    data: { url: string; alt: string; caption?: string },
  ) => void;
};

export const ImageGalleryComponent: FC<TImageGalleryComponentProps> = ({
  images,
  variant,
  onImageAdd,
  onImageDelete,
  onImageUpdate,
}) => {
  const [selectedImage, setSelectedImage] = useState<null | string>(null);

  const renderGrid = () => (
    <div className="bf-grid bf-grid-cols-2 bf-md:bf-grid-cols-3 bf-lg:bf-grid-cols-4 bf-gap-4">
      {images.map((image) => (
        <ContextMenu key={image.id}>
          <ContextMenuTrigger>
            <div className="bf-relative bf-group">
              <AspectRatio ratio={1}>
                <img
                  src={image.url}
                  alt={image.alt}
                  className="bf-object-cover bf-w-full bf-h-full bf-rounded-lg"
                />
              </AspectRatio>
              {image.caption && (
                <p className="bf-mt-2 bf-text-sm bf-text-gray-600">
                  {image.caption}
                </p>
              )}
              <div className="bf-absolute bf-inset-0 bf-bg-black/40 bf-opacity-0 group-hover:bf-opacity-100 bf-transition-opacity bf-rounded-lg bf-flex bf-items-center bf-justify-center">
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="bf-p-2 bf-bg-white/20 bf-rounded-full hover:bf-bg-white/30 bf-transition-colors">
                      <Image className="bf-size-6 bf-text-white" />
                    </button>
                  </DialogTrigger>
                  <DialogContent className="bf-max-w-4xl">
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="bf-w-full bf-h-auto bf-rounded-lg"
                    />
                    {image.caption && (
                      <p className="bf-mt-4 bf-text-lg bf-text-center">
                        {image.caption}
                      </p>
                    )}
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem>
              <Pencil className="bf-mr-2 bf-size-4" />
              <span>Edit image</span>
            </ContextMenuItem>
            <ContextMenuItem
              className="bf-text-red-600"
              onClick={() => onImageDelete(image.id)}
            >
              <Trash2 className="bf-mr-2 bf-size-4" />
              <span>Delete image</span>
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      ))}
    </div>
  );

  const renderCarousel = () => (
    <Carousel className="bf-w-full">
      <CarouselContent>
        {images.map((image) => (
          <CarouselItem key={image.id}>
            <div className="bf-relative">
              <AspectRatio ratio={16 / 9}>
                <img
                  src={image.url}
                  alt={image.alt}
                  className="bf-object-cover bf-w-full bf-h-full bf-rounded-lg"
                />
              </AspectRatio>
              {image.caption && (
                <p className="bf-mt-2 bf-text-sm bf-text-gray-600">
                  {image.caption}
                </p>
              )}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );

  const renderMasonry = () => (
    <div className="bf-columns-2 bf-md:bf-columns-3 bf-lg:bf-columns-4 bf-gap-4">
      {images.map((image) => (
        <div key={image.id} className="bf-mb-4 bf-break-inside-avoid">
          <ContextMenu>
            <ContextMenuTrigger>
              <div className="bf-relative bf-group">
                <img
                  src={image.url}
                  alt={image.alt}
                  className="bf-w-full bf-rounded-lg"
                />
                {image.caption && (
                  <p className="bf-mt-2 bf-text-sm bf-text-gray-600">
                    {image.caption}
                  </p>
                )}
                <div className="bf-absolute bf-inset-0 bf-bg-black/40 bf-opacity-0 group-hover:bf-opacity-100 bf-transition-opacity bf-rounded-lg bf-flex bf-items-center bf-justify-center">
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="bf-p-2 bf-bg-white/20 bf-rounded-full hover:bf-bg-white/30 bf-transition-colors">
                        <Image className="bf-size-6 bf-text-white" />
                      </button>
                    </DialogTrigger>
                    <DialogContent className="bf-max-w-4xl">
                      <img
                        src={image.url}
                        alt={image.alt}
                        className="bf-w-full bf-h-auto bf-rounded-lg"
                      />
                      {image.caption && (
                        <p className="bf-mt-4 bf-text-lg bf-text-center">
                          {image.caption}
                        </p>
                      )}
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem>
                <Pencil className="bf-mr-2 bf-size-4" />
                <span>Edit image</span>
              </ContextMenuItem>
              <ContextMenuItem
                className="bf-text-red-600"
                onClick={() => onImageDelete(image.id)}
              >
                <Trash2 className="bf-mr-2 bf-size-4" />
                <span>Delete image</span>
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        </div>
      ))}
    </div>
  );

  return (
    <div className="bf-relative bf-group bf-w-full">
      <ComponentHeader
        variant="primary"
        title="Image Gallery"
        tooltipText="Component for displaying image galleries"
      >
        <button onClick={onImageAdd}>
          <Plus className="bf-size-4 bf-text-gray-600" />
        </button>
      </ComponentHeader>

      <div className="bf-mt-4">
        {variant === "grid" && renderGrid()}
        {variant === "carousel" && renderCarousel()}
        {variant === "masonry" && renderMasonry()}
      </div>
    </div>
  );
};
