import { FC } from "react";

import { Loader } from "lucide-react";

import { Skeleton as ShaSkeleton } from "../../shadcn";

type TProps = {
  className?: string;
};

export const Skeleton: FC<TProps> = ({ className }) => {
  return (
    <ShaSkeleton
      className={`w-full h-[300px] rounded-md mt-4 bg-gray-200 border flex items-center justify-center ${className}`}
    >
      <Loader className="animate-spin text-gray-400" />
    </ShaSkeleton>
  );
};
