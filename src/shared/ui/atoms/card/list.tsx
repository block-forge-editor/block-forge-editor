import { FC } from "react";

type TProps = {
  children: JSX.Element | JSX.Element[];
};

export const CardsList: FC<TProps> = ({ children }) => {
  if (!children || (Array.isArray(children) && !children.length)) {
    return (
      <div className="w-full px-4 py-24 rounded-md flex items-center justify-center border shadow-md">
        Нет результатов
      </div>
    );
  }

  return <ul className="w-full flex flex-col gap-y-4 mt-4">{children}</ul>;
};
