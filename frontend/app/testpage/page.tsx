"use client"
import { DataUnitSelect } from "./elements"

export default function TestPage() {
  const handleValueChange = (value: string) => {
    console.log("Selected ID:", value)
  }

  return (
    <div>
      <h1>Test Page</h1>
      <DataUnitSelect onValueChange={handleValueChange} />
    </div>
  )
}
