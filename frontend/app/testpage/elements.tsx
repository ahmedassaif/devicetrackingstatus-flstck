"use client"

import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { CircleCheck } from "lucide-react"

export function SonnerDemo() {
  return (
    <Button
      variant="outline"
      onClick={() =>
        toast.success("Event has been created", {
          icon: <CircleCheck color="green" />,
          position: "top-right",
        })
      }
    >
      Show Toast
    </Button>
  )
}