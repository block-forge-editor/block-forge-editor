import { cn } from "@/editor/lib/font-manager";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "bf-animate-pulse bf-rounded-md bf-bg-primary/10",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
