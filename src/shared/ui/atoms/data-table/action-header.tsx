import { FC } from "react";

import { Bolt } from "lucide-react";

export const ActionHeader: FC = () => {
  return (
    <div className="flex items-center justify-end">
      <Bolt />
    </div>
  );
};
