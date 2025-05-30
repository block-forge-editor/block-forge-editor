import { FC } from "react";

import { User } from "lucide-react";

type TProps = {
  kids?: number;
  adults: number;
};

export const Capacity: FC<TProps> = ({ adults, kids = 0 }) => {
  return (
    <div className="bf-flex bf-items-end bf-gap-x-1">
      <div className="bf-flex bf-items-center">
        {adults <= 4 ? (
          Array.from({ length: adults }).map((_, index) => (
            <User
              key={index}
              fill="#04172C"
              strokeWidth={0}
              className="bf-size-5"
            />
          ))
        ) : (
          <p className="bf-text-black bf-font-medium">{adults} взр.</p>
        )}
      </div>
      {kids > 0 && (
        <>
          {"+"}
          <div className="bf-flex bf-items-center">
            {Array.from({ length: kids }).map((_, index) => (
              <User
                key={index}
                fill="#04172C"
                strokeWidth={0}
                className="bf-size-4"
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
