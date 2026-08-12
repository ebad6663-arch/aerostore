"use client";

import * as React from "react";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";

import {
  DayButton,
  DayPicker,
  getDefaultClassNames,
} from "react-day-picker";

import { cn } from "@/lib/utils";
import {
  Button,
  buttonVariants,
} from "@/components/ui/button";


function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"];
}) {

  const defaultClassNames = getDefaultClassNames();


  return (

    <DayPicker

      showOutsideDays={showOutsideDays}

      className={cn(
        "bg-background group/calendar p-3 [--cell-size:2rem]",
        className
      )}

      captionLayout={captionLayout}

      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString("default", {
            month: "short",
          }),

        ...formatters,
      }}


      classNames={{

        root: cn(
          "w-fit",
          defaultClassNames.root
        ),


        months: cn(
          "relative flex flex-col gap-4 md:flex-row",
          defaultClassNames.months
        ),


        month: cn(
          "flex w-full flex-col gap-4",
          defaultClassNames.month
        ),


        nav: cn(
          "absolute inset-x-0 top-0 flex w-full items-center justify-between",
          defaultClassNames.nav
        ),


        button_previous: cn(
          buttonVariants({
            variant: buttonVariant,
          }),
          "h-(--cell-size) w-(--cell-size) p-0",
          defaultClassNames.button_previous
        ),


        button_next: cn(
          buttonVariants({
            variant: buttonVariant,
          }),
          "h-(--cell-size) w-(--cell-size) p-0",
          defaultClassNames.button_next
        ),


        month_caption: cn(
          "flex h-(--cell-size) items-center justify-center",
          defaultClassNames.month_caption
        ),


        dropdowns: cn(
          "flex items-center justify-center gap-1.5",
          defaultClassNames.dropdowns
        ),


        dropdown_root: cn(
          "border rounded-md",
          defaultClassNames.dropdown_root
        ),


        dropdown: cn(
          "bg-popover absolute inset-0 opacity-0",
          defaultClassNames.dropdown
        ),


        caption_label: cn(
          "font-medium",
          defaultClassNames.caption_label
        ),


        month_grid: cn(
          "w-full border-collapse",
          defaultClassNames.month_grid
        ),


        weekdays: cn(
          "flex",
          defaultClassNames.weekdays
        ),


        weekday: cn(
          "text-muted-foreground flex-1 text-center text-xs",
          defaultClassNames.weekday
        ),


        week: cn(
          "mt-2 flex w-full",
          defaultClassNames.week
        ),


        week_number: cn(
          "text-muted-foreground text-xs",
          defaultClassNames.week_number
        ),


        day: cn(
          "relative aspect-square h-full w-full p-0 text-center",
          defaultClassNames.day
        ),


        range_start: cn(
          "bg-accent rounded-l-md",
          defaultClassNames.range_start
        ),


        range_middle: cn(
          "rounded-none",
          defaultClassNames.range_middle
        ),


        range_end: cn(
          "bg-accent rounded-r-md",
          defaultClassNames.range_end
        ),


        today: cn(
          "bg-accent rounded-md",
          defaultClassNames.today
        ),


        outside: cn(
          "text-muted-foreground opacity-50",
          defaultClassNames.outside
        ),


        disabled: cn(
          "opacity-50",
          defaultClassNames.disabled
        ),


        hidden: cn(
          "invisible",
          defaultClassNames.hidden
        ),


        ...classNames,

      }}



      components={{

        Chevron: ({
          className,
          orientation,
          ...props
        }) => {


          if (orientation === "left") {

            return (
              <ChevronLeftIcon
                className={cn(
                  "size-4",
                  className
                )}
                {...props}
              />
            );

          }


          if (orientation === "right") {

            return (
              <ChevronRightIcon
                className={cn(
                  "size-4",
                  className
                )}
                {...props}
              />
            );

          }


          return (
            <ChevronDownIcon
              className={cn(
                "size-4",
                className
              )}
              {...props}
            />
          );

        },


        DayButton: CalendarDayButton,


        ...components,

      }}


      {...props}

    />

  );

}





function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {


  const defaultClassNames =
    getDefaultClassNames();


  const ref =
    React.useRef<HTMLButtonElement>(null);



  React.useEffect(()=>{

    if(modifiers.focused){

      ref.current?.focus();

    }

  },[modifiers.focused]);



  return (

    <Button

      ref={ref}

      variant="ghost"

      size="icon"

      className={cn(
        "flex aspect-square h-auto w-full items-center justify-center",
        defaultClassNames.day,
        className
      )}

      {...props}

    />

  );

}



export {
  Calendar,
  CalendarDayButton,
};