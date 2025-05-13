import { FC } from "react";

import { ImageOff } from "lucide-react";

type TProps = {
  iconSize?: number;
};

export const ImagePlaceholder: FC<TProps> = ({ iconSize = 24 }) => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-300/50">
      <ImageOff size={iconSize} strokeWidth={1.3} className="text-gray-400" />
    </div>
  );
};
