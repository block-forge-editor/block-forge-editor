import { FC, useState } from "react";

import { Image as LucideImage } from "lucide-react";
import useResizeObserver from "use-resize-observer";

import { getResizedLink } from "./lib";

type TProps = {
  alt?: string;
  src?: string;
  width?: number;
  height?: number;
  quality?: number;
  className?: string;
  placeholder?: string;
  onClick?: VoidFunction;
};

export const Image: FC<TProps> = ({
  src,
  width,
  height,
  onClick,
  alt = "",
  className = "",
  quality = 70,
}) => {
  const { ref, width: refWidth, height: refHeight } = useResizeObserver();
  const [isError, setError] = useState(false);

  const isDimensions = Boolean(width && height);
  const imageWidth = isDimensions ? width : refWidth;
  const imageHeight = isDimensions ? height : refHeight;

  const imageWrapperParams = isDimensions ? {} : { ref };

  if (isError) {
    return (
      <div
        className={`bf-overflow-hidden ${className}`}
        style={{ width: imageWidth, height: imageHeight }}
      >
        <div className="bf-w-full bf-h-full bf-flex bf-items-center bf-justify-center bf-bg-gray-100">
          <LucideImage className="bf-size-8 bf-text-gray-400" />
        </div>
      </div>
    );
  }

  return (
    <div
      {...imageWrapperParams}
      className={`bf-overflow-hidden ${className}`}
      style={{ width: imageWidth, height: imageHeight }}
    >
      <img
        alt={alt}
        loading="lazy"
        onClick={onClick}
        onError={() => setError(true)}
        className="bf-w-full bf-h-full bf-object-cover"
        src={
          getResizedLink({
            src,
            quality,
            width: imageWidth,
            height: imageHeight,
          }) ?? ""
        }
      />
    </div>
  );
};
