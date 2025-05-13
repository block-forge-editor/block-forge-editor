import { FC } from "react";

import { TChildren } from "@/shared/types/common";

type TProps = {
  children: TChildren;
  mainTagClasses?: string;
  ExtraHeaderContent?: TChildren;
  ExtraFooterContent?: TChildren;
};

export const Layout: FC<TProps> = ({
  children,
  mainTagClasses,
  ExtraHeaderContent,
  ExtraFooterContent,
}) => {
  return (
    <div className="bg-background overflow-hidden flex flex-col h-screen">
      {ExtraHeaderContent}

      <main
        className={`flex-grow overflow-y-auto p-4 app-scroll ${mainTagClasses}`}
      >
        {children}
      </main>

      {ExtraFooterContent}
    </div>
  );
};
