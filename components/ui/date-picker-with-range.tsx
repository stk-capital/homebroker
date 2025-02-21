"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface DateRange {
  from?: Date
  to?: Date
}

interface DatePickerWithRangeProps {
  date: DateRange
  setDate: (date: DateRange) => void
}

export function DatePickerWithRange({ date, setDate }: DatePickerWithRangeProps) {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn("w-[280px] justify-start text-left font-normal", !date.from && "text-muted-foreground")}
        >
          {date.from ? (
            date.to ? (
              `${format(date.from, "MMM dd, yyyy")} - ${format(date.to, "MMM dd, yyyy")}`
            ) : (
              format(date.from, "MMM dd, yyyy")
            )
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="end">
        <Calendar mode="range" defaultMonth={date?.from} selected={date} onSelect={setDate} numberOfMonths={2} />
      </PopoverContent>
    </Popover>
  )
}

