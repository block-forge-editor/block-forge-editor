import { cn } from "@/editor/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "bf-animate-pulse bf-rounded-md bf-bg-neutral-900/10 dark:bf-bg-neutral-50/10",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
