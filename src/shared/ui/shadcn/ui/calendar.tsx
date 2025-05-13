import * as React from "react";
import { DayPicker } from "react-day-picker";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import { buttonVariants } from "@/shared/ui/shadcn/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      className={cn("p-3", className)}
      showOutsideDays={showOutsideDays}
      components={{
        Chevron: ({ ...props }) => {
          if (props.orientation === "left") {
            return <ChevronLeft {...props} />;
          }
          return <ChevronRight {...props} />;
        },
      }}
      classNames={{
        months: "flex flex-col space-y-4",
        month: "space-y-4 rounded-lg shadow-sm border p-4",
        month_caption: "flex justify-center pt-1 relative items-center",
        caption_label: "font-medium capitalize",
        nav: "space-x-1 flex items-center",
        button_previous: cn(
          buttonVariants({ variant: "outline" }),
          "absolute left-1 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
        ),
        button_next: cn(
          buttonVariants({ variant: "outline" }),
          "absolute right-1 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
        ),
        month_grid: "w-full border-collapse space-y-1",
        weekdays: "flex",
        weekday:
          "uppercase text-gray-400 rounded-md w-full font-normal text-[0.8rem] dark:text-slate-400",
        week: "flex w-full mt-2 flex items-center justify-between",
        day_button:
          "h-12 w-full text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-slate-100/50 [&:has([aria-selected])]:bg-slate-100 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 dark:[&:has([aria-selected].day-outside)]:bg-slate-800/50 dark:[&:has([aria-selected])]:bg-slate-800",
        day: "h-12 w-full p-0 font-normal aria-selected:opacity-100 inline-flex items-center justify-center whitespace-nowrap rounded-md text-base",
        range_end: "day-range-end",
        selected:
          "bg-brand text-slate-50 hover:bg-brand hover:text-slate-50 focus:bg-brand focus:text-slate-50 dark:bg-slate-50 dark:text-brand dark:hover:bg-slate-50 dark:hover:text-brand dark:focus:bg-slate-50 dark:focus:text-brand",
        today: "bg-slate-100 text-brand dark:bg-slate-800 dark:text-slate-50",
        outside:
          "day-outside text-slate-500 opacity-50 aria-selected:bg-slate-100/50 aria-selected:text-slate-500 aria-selected:opacity-30 dark:text-slate-400 dark:aria-selected:bg-slate-800/50 dark:aria-selected:text-slate-400",
        disabled: "text-slate-500 opacity-50 dark:text-slate-400",
        range_middle:
          "aria-selected:bg-secondary aria-selected:text-brand dark:aria-selected:bg-slate-800 dark:aria-selected:text-slate-50 rounded-none",
        hidden: "invisible",
        ...classNames,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
