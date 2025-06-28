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
          "bf-text-neutral-500 bf-rounded-md bf-w-8 bf-font-normal bf-text-[0.8rem] dark:bf-text-neutral-400",
        row: "bf-flex bf-w-full bf-mt-2",
        cell: cn(
          "bf-relative bf-p-0 bf-text-center bf-text-sm focus-within:bf-relative focus-within:bf-z-20 [&:has([aria-selected])]:bf-bg-neutral-100 [&:has([aria-selected].day-outside)]:bf-bg-neutral-100/50 [&:has([aria-selected].day-range-end)]:bf-rounded-r-md dark:[&:has([aria-selected])]:bf-bg-neutral-800 dark:[&:has([aria-selected].day-outside)]:bf-bg-neutral-800/50",
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
          "bf-bg-neutral-900 bf-text-neutral-50 hover:bf-bg-neutral-900 hover:bf-text-neutral-50 focus:bf-bg-neutral-900 focus:bf-text-neutral-50 dark:bf-bg-neutral-50 dark:bf-text-neutral-900 dark:hover:bf-bg-neutral-50 dark:hover:bf-text-neutral-900 dark:focus:bf-bg-neutral-50 dark:focus:bf-text-neutral-900",
        day_today:
          "bf-bg-neutral-100 bf-text-neutral-900 dark:bf-bg-neutral-800 dark:bf-text-neutral-50",
        day_outside:
          "bf-day-outside bf-text-neutral-500 aria-selected:bf-bg-neutral-100/50 aria-selected:bf-text-neutral-500 dark:bf-text-neutral-400 dark:aria-selected:bf-bg-neutral-800/50 dark:aria-selected:bf-text-neutral-400",
        day_disabled:
          "bf-text-neutral-500 bf-opacity-50 dark:bf-text-neutral-400",
        day_range_middle:
          "aria-selected:bf-bg-neutral-100 aria-selected:bf-text-neutral-900 dark:aria-selected:bf-bg-neutral-800 dark:aria-selected:bf-text-neutral-50",
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
