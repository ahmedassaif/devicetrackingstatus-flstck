/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown, CircleX, RotateCw } from "lucide-react"

import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ListResponse, ResponseResult } from "@/api/services/types/commonResponses.types"
import { DataUnitDto } from "@/api/services/types/dataUnit.types"
import { DataUnitService } from "@/api/services/spesific-services/dataUnit.service"
import { Input } from "../ui/input"
import { SelectorListRequest } from "@/api/services/types/commonRequest.types"
import { useEffect } from "react"
import axios, { CancelTokenSource } from "axios"
import { toast } from "@/hooks/use-toast"

interface DataUnitSelectProps { 
    onValueChange: (value: string) => void; 
    value: string;
    refresh: boolean; // New prop for refreshing data
}

const DataUnitsSelector: React.FC<DataUnitSelectProps> = ({ onValueChange, value, refresh }) => {

    const [dataUnits, setDataUnits] = React.useState<DataUnitDto[]>([]);
    const [searchTerm, setSearchTerm] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);

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

    useEffect(() => {
        const source: CancelTokenSource = axios.CancelToken.source();

        const fetchDataUnits = async () => {
            setIsLoading(true);
            const request: SelectorListRequest = {
                searchText: searchTerm?.trim() ? searchTerm : undefined,
            };
            
            try {
                const dataUnitService = new DataUnitService();
                const response: ResponseResult<ListResponse<DataUnitDto>> = await dataUnitService.getLookupDataUnits({
                    ...request,
                    cancelToken: source.token, // Add cancel token to the request
                });

                handleDataUnitsResponse(response); // Call the improved function

            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : "Failed to handle Get DataUnits";
                toast({
                    title: "Failed",
                    description: errorMessage,
                    variant: "destructive",
                });
            } 
            finally {
                setIsLoading(false);
            }
        };

        fetchDataUnits();

        return () => source.cancel('Request canceled by the user.');
    }, [handleDataUnitsResponse, searchTerm, refresh]); // Add refresh to dependencies

    const handleClearInput = (e: React.MouseEvent) => {
        e.stopPropagation() // Prevent triggering select dropdown toggle
        setSearchTerm("")
    }

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
        </SelectPrimitive.Trigger>
    ))
    SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

    return (
        <div>
            <Select onValueChange={onValueChange} value={value}>
                <SelectTrigger>
                    <SelectValue placeholder="Pilih Lokasi Kerja" />
                    <SelectPrimitive.Icon asChild>
                        {isLoading ? (
                            <RotateCw className="h-4 w-4 opacity-50 animate-spin" />
                        ) : (
                            <ChevronDown className="h-4 w-4 opacity-50" />
                        )}
                    </SelectPrimitive.Icon>
                </SelectTrigger>
                <SelectContent>
                    <div className="sticky top-0 p-1 bg-background z-10">
                        <Input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="focus-visible:ring-0" // Remove focus ring to match style
                        />
                        {searchTerm && (
                            <div className="absolute inset-y-0 end-0 flex items-center pe-3.5">
                                <CircleX
                                    className="cursor-pointer" 
                                    onClick={handleClearInput} 
                                    size={20} 
                                />
                            </div>
                        )}
                    </div>
                    <SelectGroup>
                        {dataUnits.length > 0 ? (
                            dataUnits.map((dataUnit) => (
                                <SelectItem key={dataUnit.id} value={dataUnit.id}>
                                    {dataUnit.NameUnit}
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

export default DataUnitsSelector;
