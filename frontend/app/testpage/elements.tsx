/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function TimeSelector() {
  // Create arrays for hours and minutes
  const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'))
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'))

  return (
    <div className="flex gap-2 align-items-center">
      <Select>
        <SelectTrigger className="w-[70px]">
          <SelectValue placeholder="HH" />
        </SelectTrigger>
        <SelectContent style={{ minWidth: "var(--radix-select-trigger-width)" }}>
          <SelectGroup>
            {hours.map(hour => (
              <SelectItem key={hour} value={hour}>{hour}</SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      :
      <Select>
        <SelectTrigger className="w-[70px]">
          <SelectValue placeholder="MM" />
        </SelectTrigger>
        <SelectContent style={{ minWidth: "var(--radix-select-trigger-width)" }}>
          <SelectGroup>
            {minutes.map(minute => (
              <SelectItem key={minute} value={minute}>{minute}</SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
