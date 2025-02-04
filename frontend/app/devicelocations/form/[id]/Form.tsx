/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { DeviceLocationService } from '@/api/services/spesific-services/deviceLocation.service';
import { GetDeviceLocationsDeviceLocation, UpdateDeviceLocationRequest, deviceLocationFormSchema, emptyDeviceLocation } from '@/api/services/types/deviceLocation.types';
import { ResponseResult } from '@/api/services/types/commonResponses.types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { toast } from "sonner";
import { RotateCw, PlusCircle } from 'lucide-react';
import loadingBackground from "@/public/images/beams.jpg";
import Image from "next/image";
import { Form, FormField, FormItem, FormLabel, FormMessage, FormControl } from "@/components/ui/form";
import DataUnitsSelector from '@/components/selectors/dataunits.selector';
import DeviceLocationInfo from "@/components/alerts/devicelocation.alert";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import CreateDataUnitDialog from "@/components/dialog/createdataunit.dialog";

interface DeviceLocationEditFormProps {
    deviceLocationId: string;
}

const DeviceLocationEditForm : React.FC<DeviceLocationEditFormProps> = ({ deviceLocationId }) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [showCreateDataUnitDialog, setShowCreateDataUnitDialog] = useState(false);
    const [refreshDataUnits, setRefreshDataUnits] = useState(false);

    const router = useRouter();
    const form = useForm({
        resolver: zodResolver(deviceLocationFormSchema),
        defaultValues: emptyDeviceLocation,
    });

    useEffect(() => {
        const fetchDeviceLocationDetail = async () => {
        if (!deviceLocationId) return;
        
        try {
            const deviceLocationService = new DeviceLocationService();
            const response: ResponseResult<GetDeviceLocationsDeviceLocation> = 
            await deviceLocationService.getDeviceLocation(deviceLocationId);

            if (response.result) {
            form.reset({
                NameDeviceLocation: response.result.NameDeviceLocation,
                DataUnitId: response.result.DataUnitId
            });
            } else {
            toast.error("Failed", {
                description: response.error?.detail || "Failed to fetch DeviceLocation detail",
            });
            }
        } catch (error: unknown) { 
            const errorMessage = error instanceof Error ? error.message : "Failed to fetch DeviceLocation details";
            toast.error("Failed", {
            description: errorMessage,
            });
        } finally {
            setLoading(false);
        }
        };
    
        fetchDeviceLocationDetail();
    }, [deviceLocationId, form]); 

    let showLoadingForSaveData;
    if (loading) {
        showLoadingForSaveData = (
            <RotateCw className="animate-spin" size={20} />
        ); 
    }

    const saveData = async (values: z.infer<typeof deviceLocationFormSchema>) => {
        setLoading(true);

        try {
            const deviceLocationService = new DeviceLocationService();
            const updateDeviceLocationRequest = new UpdateDeviceLocationRequest(
                deviceLocationId,
                values.NameDeviceLocation,
                values.DataUnitId
            );

            const response: ResponseResult<GetDeviceLocationsDeviceLocation> = 
                await deviceLocationService.updateDeviceLocation(updateDeviceLocationRequest);

            if (response.result) {
                toast.success("Success", {
                description: "Data Lokasi Kerja berhasil diubah!",
                });
                router.push(`/devicelocations/form/${response.result.id}`);
            } else {
                const errorText = response?.error?.detail || "Failed to Update DeviceLocations";
                toast.error("Failed", {
                description: errorText,
                });
            }
        } catch (error: unknown) { 
            const errorMessage = error instanceof Error ? error.message : "Failed to update DeviceLocations";
            toast.error("Failed", {
                description: errorMessage,
            });
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
        <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
            <Image
            src={loadingBackground}
            alt="Loading Screen"
            fill
            className="h-full w-full rounded-md object-cover"                        
            />
            <div className="relative px-6 pb-8 pt-10 shadow-xl sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
            <div className="mx-auto max-w-md">
                <Button disabled>
                <RotateCw size="sm" className="animate-spin" />
                <span className="pl-3">Loading...</span>
                </Button>
            </div>
            </div>
        </div>
        );
    }

    function reloadDataUnitsSelector()
    {
        setRefreshDataUnits(true); // Pass the refresh callback
        setTimeout(() => setRefreshDataUnits(false), 2000); // Reset after 2 seconds
    }

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-4">
            <h1 className="mb-4 text-2xl font-bold">Edit Lokasi Utama Perangkat</h1>
            <DeviceLocationInfo />
            <section className="flex w-full items-center">
                <div className="w-full">
                <Card className="p-6">
                    <Form {...form}>
                    <form onSubmit={form.handleSubmit(saveData)} className="flex flex-col gap-4">
                    <div className="flex gap-4 items-end">
                                        <div className="w-full flex-1">
                                            <FormField
                                                control={form.control}
                                                name="DataUnitId"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Lokasi Kerja</FormLabel>
                                                        <FormControl>
                                                            <DataUnitsSelector 
                                                                onValueChange={(value) => form.setValue("DataUnitId", value)} 
                                                                value={field.value} 
                                                                refresh={refreshDataUnits} // Pass refresh prop
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div className="items-end w-7 flex justify-center">
                                            <HoverCard>
                                                <HoverCardTrigger asChild>
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowCreateDataUnitDialog(true)}
                                                        className="rounded-full bg-blue-500 p-2 text-white hover:bg-blue-600 focus:outline-none"
                                                        aria-label="search"
                                                    >
                                                        <PlusCircle size={25} />
                                                    </button>
                                                </HoverCardTrigger>
                                                <HoverCardContent side="top" arrowPadding={2} className="w-full">
                                                    Tambah Lokasi Kerja
                                                </HoverCardContent>
                                            </HoverCard>
                                        </div>
                                    </div>
                        <FormField
                        control={form.control}
                        name="NameDeviceLocation"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nama Lokasi Utama</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nama Lokasi Utama" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                        <div className="flex space-x-3">
                        <Button 
                            type="submit" 
                            className="bg-green-700 hover:bg-green-800"
                        >
                            {showLoadingForSaveData}
                            Save
                        </Button>
                        <Button 
                            type="button"
                            variant="outline"
                            onClick={() => router.push('/devicelocations')}
                        >
                            Back
                        </Button>
                        </div>
                    </form>
                    </Form>
                </Card>
                </div>
            </section>
            <CreateDataUnitDialog 
                isOpen={showCreateDataUnitDialog}
                onOpenChange={setShowCreateDataUnitDialog}
                onSuccess={reloadDataUnitsSelector}
            />
        </div>
    );
}

export default DeviceLocationEditForm; 