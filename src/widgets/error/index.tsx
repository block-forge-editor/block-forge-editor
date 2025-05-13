import { FC } from "react";

import { PageStatus } from "@/entities/page-status";

export const Error: FC = () => (
  <div className="w-full h-[100vh] flex items-center justify-center">
    <PageStatus type={500} />
  </div>
);
