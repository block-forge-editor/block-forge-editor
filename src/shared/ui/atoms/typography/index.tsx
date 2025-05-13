import { cn } from "@/shared/lib/utils";

type TProps = {
  elipsis?: boolean;
  className?: string;
  children: React.ReactNode;
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "blockquote";
};

const TAG_CLASSNAMES = {
  p: "leading-6",
  blockquote: "border-l-2 pl-6 italic",
  h4: "text-xl font-semibold tracking-tight",
  h5: "text-lg font-semibold tracking-tight",
  h2: "text-3xl font-semibold tracking-tight",
  h3: "text-2xl font-semibold tracking-tight",
  h6: "text-base font-semibold tracking-tight",
  h1: "text-4xl font-extrabold tracking-tight lg:text-5xl",
};

const ELLIPSIS_CLASSNAMES = "overflow-ellipsis";

const createTagElement = ({
  tagName,
  children,
  className,
  additionalClasses,
}: TProps & {
  tagName: string;
  additionalClasses: string;
}) => {
  const HtmlTag = tagName as keyof JSX.IntrinsicElements;
  return (
    <HtmlTag className={cn(`scroll-m-20 ${additionalClasses}`, className)}>
      {children}
    </HtmlTag>
  );
};

export const Typography = ({
  variant,
  children,
  className,
  elipsis,
}: TProps) => {
  switch (variant) {
    case "h1":
    case "h2":
    case "h3":
    case "h4":
    case "h5":
    case "h6":
    case "blockquote":
      return createTagElement({
        children,
        className,
        tagName: variant,
        additionalClasses: `${TAG_CLASSNAMES[variant]} ${
          elipsis ? ELLIPSIS_CLASSNAMES : ""
        }`,
      });
    default:
      return createTagElement({
        children,
        className,
        tagName: "p",
        additionalClasses: TAG_CLASSNAMES.p,
      });
  }
};
