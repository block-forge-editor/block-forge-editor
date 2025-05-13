import { FC } from "react";

type TProps = {
  className?: string;
  type?: "li" | "div";
  children: JSX.Element | JSX.Element[];
};

export const RoundedBox: FC<TProps> = ({
  children,
  className,
  type = "div",
}) => {
  const HtmlTag = type as keyof JSX.IntrinsicElements;

  return (
    <HtmlTag
      className={`w-full rounded-xl shadow-lg shadow-black/5 bg-white ${className}`}
    >
      {children}
    </HtmlTag>
  );
};
