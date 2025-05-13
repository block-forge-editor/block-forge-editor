import { FC, useState, useEffect } from "react";

import { ImagePlaceholder } from "../../atoms";
import { Image } from "../image";

import { TImage } from "@/shared/types/common/entities/tours";
import {
  CarouselApi,
  CarouselItem,
  CarouselNext,
  CarouselContent,
  CarouselPrevious,
  Carousel as ShaCarousel,
} from "@/shared/ui/shadcn";

type TProps = {
  images: TImage[];
  withDots?: boolean;
  withCounter?: boolean;
  counterClasses?: string;
  wrapperClasses?: string;
};

const DOTS_COUNT = 5;

export const Carousel: FC<TProps> = ({
  images = [],
  wrapperClasses = "w-full",
  counterClasses = "py-2 text-center text-sm text-muted-foreground",
  withCounter = false,
  withDots = false,
}) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const dotsLength = count >= DOTS_COUNT ? DOTS_COUNT : count;

  useEffect(() => {
    if (!api || (!withDots && !withCounter)) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api]);

  if (!images.length || !images) {
    return (
      <div className={wrapperClasses}>
        <ImagePlaceholder iconSize={48} />
      </div>
    );
  }

  return (
    <ShaCarousel setApi={setApi} className={wrapperClasses}>
      <CarouselContent className="h-full">
        {images
          .slice(0, withDots ? DOTS_COUNT : undefined)
          .map(({ id, src }, index) => (
            <CarouselItem key={id} className="h-full">
              <Image
                src={src}
                className="size-full"
                alt={`carousel-${index}`}
              />
            </CarouselItem>
          ))}
      </CarouselContent>

      {withCounter && (
        <div className={`flex items-center justify-between ${counterClasses}`}>
          <CarouselPrevious className="!text-black" />
          <p>
            {current} / {count}
          </p>
          <CarouselNext className="!text-black" />
        </div>
      )}

      {withDots && (
        <ul
          className={`flex items-center gap-x-2 absolute w-full justify-center bottom-3`}
        >
          {Array.from({ length: dotsLength }).map((_, index) => (
            <li
              key={index}
              className={`rounded-full transition-all bg-white ${
                current - 1 === index ? "w-4 min-h-2" : "w-2 min-h-2"
              }`}
            />
          ))}
        </ul>
      )}
    </ShaCarousel>
  );
};
