import { FC, useState } from "react";

import useResizeObserver from "use-resize-observer";

import { ImagePlaceholder } from "../../atoms";
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
        className={`overflow-hidden ${className}`}
        style={{ width: imageWidth, height: imageHeight }}
      >
        <ImagePlaceholder />
      </div>
    );
  }

  return (
    <div
      {...imageWrapperParams}
      className={`overflow-hidden ${className}`}
      style={{ width: imageWidth, height: imageHeight }}
    >
      <img
        alt={alt}
        loading="lazy"
        onClick={onClick}
        onError={() => setError(true)}
        className="w-full h-full object-cover"
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
