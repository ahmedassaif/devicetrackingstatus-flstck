"use client"

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { SelectContent, SelectGroup, SelectLabel, SelectValue } from "@/components/ui/select"
import { ListResponse, ResponseResult } from "@/api/services/types/commonResponses.types"
import { DataUnitDto } from "@/api/services/types/dataUnit.types"
import { DataUnitService } from "@/api/services/spesific-services/dataUnit.service"

// Custom Hook Logic
function useDataUnits() {
    const [dataUnits, setDataUnits] = React.useState<DataUnitDto[]>([])

    const handleDataUnitsResponse = React.useCallback(
        (response: ResponseResult<ListResponse<DataUnitDto>>) => {
        if (response.error) {
            setDataUnits([]) // Clear DataUnits on error
            return
        }

        if (Array.isArray(response.result)) {
          setDataUnits(response.result) // Update DataUnits with fetched data
        } else {
          setDataUnits([]) // Clear DataUnits on unexpected response
        }
        },
        [setDataUnits]
    )

    React.useEffect(() => {
        const fetchData = async () => {
        try {
            const dataUnitService = new DataUnitService()
            const response = await dataUnitService.getLookupAllDataUnits()

            if (response.result) {
            handleDataUnitsResponse(response)
            } else {
            console.error("Error: No result in response")
            }
        } catch (error) {
            console.error("Error fetching data units:", error)
        }
    }

    fetchData()
    }, [handleDataUnitsResponse])

    return dataUnits
}

const Select = SelectPrimitive.Root

const SelectTrigger = React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.Trigger>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
    >(({ className, children, ...props }, ref) => (
    <SelectPrimitive.Trigger
        ref={ref}
        className={cn(
        "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
        className
        )}
        {...props}
    >
        {children}
        <SelectPrimitive.Icon asChild>
        <ChevronDown className="h-4 w-4 opacity-50" />
        </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
    ))
    SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

    const SelectItem = React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.Item>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
    >(({ className, children, ...props }, ref) => (
    <SelectPrimitive.Item
        ref={ref}
        className={cn(
        "flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
        )}
        {...props}
    >
        <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
            <Check className="h-4 w-4" />
        </SelectPrimitive.ItemIndicator>
        </span>
        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

interface DataUnitSelectProps { 
    onValueChange: (value: string) => void; 
    value: string; 
}

export function DataUnitSelect({ onValueChange, value }: DataUnitSelectProps) {
    const dataUnits = useDataUnits()

    return (
        <div>
        {/* <Select onValueChange={onValueChange}>
            <SelectTrigger>
            <SelectPrimitive.Value placeholder="Select a data unit..." />
            </SelectTrigger>
            <SelectPrimitive.Content position="popper" side="bottom" align="start" sideOffset={5} style={{ minWidth: "var(--radix-select-trigger-width)" }}>
            <SelectPrimitive.Viewport>
                {dataUnits?.length > 0 ? (
                dataUnits.map((dataUnit) => (
                    <SelectItem key={dataUnit.id} value={dataUnit.id}>
                    {dataUnit.NameUnit} - {dataUnit.Plan}
                    </SelectItem>
                ))
                ) : (
                <div className="px-2 py-1.5 text-sm text-muted-foreground">
                    No data available
                </div>
                )}
            </SelectPrimitive.Viewport>
            </SelectPrimitive.Content>
        </Select> */}
        <Select onValueChange={onValueChange} value={value}>
            <SelectTrigger>
            <SelectValue placeholder="Pilih Lokasi Kerja" />
            </SelectTrigger>
            <SelectContent>
            <SelectGroup>
                <SelectLabel>Lokasi Kerja</SelectLabel>
                {dataUnits?.length > 0 ? (
                dataUnits.map((dataUnit) => (
                    <SelectItem key={dataUnit.id} value={dataUnit.id}>
                    {dataUnit.NameUnit}{dataUnit.Plan ? ` - ${dataUnit.Plan}` : ''}
                    </SelectItem>
                ))
                ) : (
                <div className="px-2 py-1.5 text-sm text-muted-foreground">
                    No data available
                </div>
                )}
            </SelectGroup>
            </SelectContent>
        </Select>
        </div>
    )
}
