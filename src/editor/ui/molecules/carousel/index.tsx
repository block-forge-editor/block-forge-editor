import { FC, useState, useEffect } from "react";

import { Image } from "../image";

type TImage = {
  id: string;
  src: string;
};
import { Image as LucideImage } from "lucide-react";

import {
  CarouselApi,
  CarouselItem,
  CarouselNext,
  CarouselContent,
  CarouselPrevious,
  Carousel as ShaCarousel,
} from "@/editor/ui/shadcn";

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
  wrapperClasses = "bf-w-full",
  counterClasses = "bf-py-2 bf-text-center bf-text-sm bf-text-muted-foreground",
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
        <div className="bf-w-full bf-h-full bf-flex bf-items-center bf-justify-center bf-bg-gray-100">
          <LucideImage className="bf-size-8 bf-text-gray-400" />
        </div>{" "}
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
        <div
          className={`bf-flex bf-items-center bf-justify-between ${counterClasses}`}
        >
          <CarouselPrevious className="!bf-text-black" />
          <p>
            {current} / {count}
          </p>
          <CarouselNext className="!bf-text-black" />
        </div>
      )}

      {withDots && (
        <ul
          className={`bf-flex bf-items-center bf-gap-x-2 bf-absolute bf-w-full bf-justify-center bf-bottom-3`}
        >
          {Array.from({ length: dotsLength }).map((_, index) => (
            <li
              key={index}
              className={`bf-rounded-full bf-transition-all bf-bg-white ${
                current - 1 === index
                  ? "bf-w-4 bf-min-h-2"
                  : "bf-w-2 bf-min-h-2"
              }`}
            />
          ))}
        </ul>
      )}
    </ShaCarousel>
  );
};
