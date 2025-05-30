import { cn } from "@/editor/lib/utils";

type TProps = {
  elipsis?: boolean;
  className?: string;
  children: React.ReactNode;
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "blockquote";
};

const TAG_CLASSNAMES = {
  p: "bf-leading-6",
  blockquote: "bf-border-l-2 bf-pl-6 bf-italic",
  h4: "bf-text-xl bf-font-semibold bf-tracking-tight",
  h5: "bf-text-lg bf-font-semibold bf-tracking-tight",
  h2: "bf-text-3xl bf-font-semibold bf-tracking-tight",
  h3: "bf-text-2xl bf-font-semibold bf-tracking-tight",
  h6: "bf-text-base bf-font-semibold bf-tracking-tight",
  h1: "bf-text-4xl bf-font-extrabold bf-tracking-tight bf-lg:bf-text-5xl",
};

const ELLIPSIS_CLASSNAMES = "bf-overflow-ellipsis";

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
    <HtmlTag className={cn(`bf-scroll-m-20 ${additionalClasses}`, className)}>
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
