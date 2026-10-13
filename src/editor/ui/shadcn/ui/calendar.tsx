import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/editor/lib/font-manager";
import { buttonVariants } from "@/editor/ui/shadcn/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("bf-p-3", className)}
      classNames={{
        months:
          "bf-flex bf-flex-col sm:bf-flex-row bf-space-y-4 sm:bf-space-x-4 sm:bf-space-y-0",
        month: "bf-space-y-4",
        caption:
          "bf-flex bf-justify-center bf-pt-1 bf-relative bf-items-center",
        caption_label: "bf-text-sm bf-font-medium",
        nav: "bf-space-x-1 bf-flex bf-items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "bf-h-7 bf-w-7 bf-bg-transparent bf-p-0 bf-opacity-50 hover:bf-opacity-100",
        ),
        nav_button_previous: "bf-absolute bf-left-1",
        nav_button_next: "bf-absolute bf-right-1",
        table: "bf-w-full bf-border-collapse bf-space-y-1",
        head_row: "bf-flex",
        head_cell:
          "bf-text-muted-foreground bf-rounded-md bf-w-8 bf-font-normal bf-text-[0.8rem]",
        row: "bf-flex bf-w-full bf-mt-2",
        cell: cn(
          "bf-relative bf-p-0 bf-text-center bf-text-sm focus-within:bf-relative focus-within:bf-z-20 [&:has([aria-selected])]:bf-bg-accent [&:has([aria-selected].day-outside)]:bf-bg-accent/50 [&:has([aria-selected].day-range-end)]:bf-rounded-r-md",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:bf-rounded-r-md [&:has(>.day-range-start)]:bf-rounded-l-md first:[&:has([aria-selected])]:bf-rounded-l-md last:[&:has([aria-selected])]:bf-rounded-r-md"
            : "[&:has([aria-selected])]:bf-rounded-md",
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "bf-h-8 bf-w-8 bf-p-0 bf-font-normal aria-selected:bf-opacity-100",
        ),
        day_range_start: "bf-day-range-start",
        day_range_end: "bf-day-range-end",
        day_selected:
          "bf-bg-primary bf-text-primary-foreground hover:bf-bg-primary hover:bf-text-primary-foreground focus:bf-bg-primary focus:bf-text-primary-foreground",
        day_today: "bf-bg-secondary bf-text-secondary-foreground",
        day_outside:
          "bf-day-outside bf-text-muted-foreground aria-selected:bf-bg-accent/50 aria-selected:bf-text-muted-foreground",
        day_disabled: "bf-text-muted-foreground bf-opacity-50",
        day_range_middle:
          "aria-selected:bf-bg-accent aria-selected:bf-text-accent-foreground",
        day_hidden: "bf-invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft className={cn("bf-h-4 bf-w-4", className)} {...props} />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight className={cn("bf-h-4 bf-w-4", className)} {...props} />
        ),
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
