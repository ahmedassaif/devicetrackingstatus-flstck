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

import { DetailedDeviceLocationService } from "@/api/services/spesific-services/detailedDeviceLocation.service";
import {
    GetLookupDetailedDeviceLocationsByDeviceLocationRequest, 
    GetLookupDetailedDeviceLocationsByDeviceLocationResponse 
} from "@/api/services/types/detailedDeviceLocation.types";

interface DetailedDeviceLocationSelectProps {
    DeviceLocationId : string;
    onValueChange: (value: string) => void; 
    value: string;
}

const DetailedDeviceLocationSelector: React.FC<DetailedDeviceLocationSelectProps> = ({ DeviceLocationId, onValueChange, value }) => {

    const [detailedDeviceLocations, setDetailedDeviceLocations] = React.useState<GetLookupDetailedDeviceLocationsByDeviceLocationResponse[]>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [searchTerm, setSearchTerm] = React.useState<string>("");

    const handleLookupResponse = React.useCallback((
        response: ResponseResult<ListResponse<GetLookupDetailedDeviceLocationsByDeviceLocationResponse>>) => {
        if (response.error) {
            setDetailedDeviceLocations([]);
            return;
        }

        if (Array.isArray(response.result)) {
            setDetailedDeviceLocations(response.result);
        }
    }, [setDetailedDeviceLocations]);

    useEffect(() => {

        const source: CancelTokenSource = axios.CancelToken.source();

        const fetchData = async () => {
            
            setIsLoading(true);

            const request: GetLookupDetailedDeviceLocationsByDeviceLocationRequest = {
                DeviceLocationId: DeviceLocationId || "",
                searchText: searchTerm || ""
            };

            try {
                
                const detailedDeviceLocationService = new DetailedDeviceLocationService();

                const response = await detailedDeviceLocationService.getLookupDetailedDeviceLocationsByDeviceLocation(request);

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
    }, [DeviceLocationId, searchTerm, handleLookupResponse]);

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
                        {detailedDeviceLocations.length > 0 ? (
                            detailedDeviceLocations.map((detailedDeviceLocation) => (
                                <SelectItem key={detailedDeviceLocation.id} value={detailedDeviceLocation.id}>
                                    {detailedDeviceLocation.NameDetailLoation}
                                </SelectItem>
                            ))
                        ) : (
                            <SelectItem disabled value={""}>
                                No Data
                            </SelectItem>
                        )}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}

export default DetailedDeviceLocationSelector;