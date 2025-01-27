/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { 
    Check,
    ChevronDown, 
    CircleX, 
    RotateCw 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Select, 
    SelectContent, 
    SelectGroup,
    SelectItem,
    SelectLabel, 
    SelectTrigger, 
    SelectValue 
} from "@/components/ui/select";
import { 
    ListResponse, 
    ResponseResult 
} from "@/api/services/types/commonResponses.types";
import { Input } from "../ui/input"
import { useEffect } from "react"
import axios, { CancelTokenSource } from "axios"
import { toast } from "@/hooks/use-toast"

import { 
    GetLookupDeviceLocationsByDataUnitRequest, 
    GetLookupDeviceLocationsByDataUnitResponse 
} from "@/api/services/types/deviceLocation.types";
import { DeviceLocationService } from "@/api/services/spesific-services/deviceLocation.service";

interface DeviceLocationSelectProps {
    DataUnitId : string;
    onValueChange: (value: string) => void; 
    value: string;
}

const DeviceLocationSelector: React.FC<DeviceLocationSelectProps> = ({ DataUnitId, onValueChange, value }) => {
    // Initialize state with default values
    // const [selectedValue, setSelectedValue] = React.useState(value);
    const [deviceLocations, setDeviceLocations] = React.useState<GetLookupDeviceLocationsByDataUnitResponse[]>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    // const [isError, setIsError] = React.useState<boolean>(false);
    const [searchTerm, setSearchTerm] = React.useState<string>("");
    // const [isFocused, setIsFocused] = React.useState<boolean>(false);
    
    // Fetch data from API
    // const handleLookupResponse = React.useCallback((
    //     response: ResponseResult<ListResponse<GetLookupDeviceLocationsByDataUnitResponse>>) => {
    //     if (response.error) {
    //         setDeviceLocations([]);
    //         return;
    //     }

    //     if (Array.isArray(response.result)) {
    //         setDeviceLocations(response.result);
    //     } else {
    //         setDeviceLocations([]);
    //     }
    // }, [setDeviceLocations]);

    const handleLookupResponse = React.useCallback(
        (response: ResponseResult<ListResponse<GetLookupDeviceLocationsByDataUnitResponse>>) => {
            if (response.error) {
                setDeviceLocations([]);
                return;
            }

            if (Array.isArray(response.result)) {
                setDeviceLocations(response.result);
            } else {
                setDeviceLocations([]);
            }
        },
        [setDeviceLocations]
    )

    useEffect(() => {
        const source: CancelTokenSource = axios.CancelToken.source();

        const fetchData = async () => {
            setIsLoading(true);

            const request: GetLookupDeviceLocationsByDataUnitRequest = {
                DataUnitId: DataUnitId ? DataUnitId : undefined,
                searchText: searchTerm?.trim() ? searchTerm : undefined,
            };

            try {
                const deviceLocationService = new DeviceLocationService();
                const response: ResponseResult<ListResponse<GetLookupDeviceLocationsByDataUnitResponse>> = await deviceLocationService.getLookupAllDeviceLocations({
                    ...request,
                    cancelToken: source.token,
                });

                handleLookupResponse(response);

            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : "Failed to handle Get Detailed Device Locations";
                toast({
                    title: "Failed",
                    description: errorMessage,
                    variant: "destructive",
                });
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();

        return () => {
            source.cancel("Request cancelled");
        };
    }, [DataUnitId, searchTerm, handleLookupResponse]);

    const handleClearInput = (e: React.MouseEvent) => {
            e.stopPropagation() // Prevent triggering select dropdown toggle
            setSearchTerm("")
    }
    
    // const Select = SelectPrimitive.Root
        
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

    SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

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
                            className="focus-visible:ring-0"
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
                        {deviceLocations.length > 0 ? (
                            deviceLocations.map((item) => (
                                <SelectItem key={item.id} value={item.id}>
                                    {item.NameDeviceLocation}
                                </SelectItem>
                            ))
                        ) : (
                            <SelectItem disabled value={""}>
                                <SelectLabel>Tidak ada data</SelectLabel>
                            </SelectItem>
                        )}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );

}

export default DeviceLocationSelector;