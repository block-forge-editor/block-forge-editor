import { FC } from "react";

type TProps = {
  heading: string;
  className?: string;
};

export const PageHeading: FC<TProps> = ({ heading, className = "" }) => {
  return (
    <h1 className={`text-3xl leading-10 font-bold ${className}`}>{heading}</h1>
  );
};
