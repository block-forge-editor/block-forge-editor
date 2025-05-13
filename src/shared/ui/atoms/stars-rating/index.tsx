import { FC } from "react";

import { Star } from "lucide-react";

import { cn } from "@/shared/lib/utils";

type TProps = {
  className?: string;
  rating?: null | number | string;
};

export const StarsRating: FC<TProps> = ({ rating, className }) => {
  if (!rating) {
    return (
      <p className="text-xs py-0.5 px-2 rounded-md bg-sky-100 w-fit text-gray-600 mb-1">
        Категория не указана
      </p>
    );
  }

  if (typeof rating === "string") {
    return (
      <p className="text-xs py-0.5 px-2 rounded-md bg-orange-400 w-fit text-white mb-1">
        {rating}
      </p>
    );
  }

  return (
    <ul className="flex items-center gap-x-1">
      {Array.from({
        length: rating,
      }).map((_, index) => (
        <li key={index}>
          <Star
            fill="#FAB042"
            strokeWidth={0}
            className={cn("size-5", className)}
          />
        </li>
      ))}
    </ul>
  );
};
