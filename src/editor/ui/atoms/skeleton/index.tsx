import { FC } from "react";

import { Loader } from "lucide-react";

import { Skeleton as ShaSkeleton } from "../../shadcn";

type TProps = {
  className?: string;
};

export const Skeleton: FC<TProps> = ({ className }) => {
  return (
    <ShaSkeleton
      className={`bf-w-full bf-h-[200px] bf-rounded-md bf-mt-4 bf-bg-gray-200 bf-border bf-flex bf-items-center bf-justify-center ${className}`}
    >
      <Loader className="bf-animate-spin bf-text-gray-400" />
    </ShaSkeleton>
  );
};
