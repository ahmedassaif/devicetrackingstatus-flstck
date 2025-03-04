/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { DeviceLocationService } from "@/api/services/spesific-services/deviceLocation.service";
import { CreateDeviceLocationRequest, GetDeviceLocationsDeviceLocation, deviceLocationFormSchema, emptyDeviceLocation } from '@/api/services/types/deviceLocation.types';
import { ResponseResult } from '@/api/services/types/commonResponses.types';
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from 'next/navigation';
import { toast } from "sonner";
import { Form, FormField, FormItem, FormLabel, FormMessage, FormControl } from "@/components/ui/form";
import { useState } from "react";
import { PlusCircle, RotateCw, SheetIcon } from "lucide-react";
import DataUnitsSelector from "@/components/selectors/dataunits.selector";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import CreateDataUnitDialog from "@/components/dialog/createdataunit.dialog";
import DeviceLocationInfo from "@/components/alerts/devicelocation.alert";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

export default function DeviceLocationFormPage() {
    const [loading, setLoading] = useState(false);
    const [showCreateDataUnitDialog, setShowCreateDataUnitDialog] = useState(false);
    const [refreshDataUnits, setRefreshDataUnits] = useState(false);
    const [loadingDownloadFile, setLoadingDownloadFile] = useState<boolean>(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null); // State for the selected file

    const router = useRouter();
    const form = useForm({
        resolver: zodResolver(deviceLocationFormSchema),
        defaultValues: emptyDeviceLocation,
    });

    let showLoadingForDownloadExcel;
    if (loadingDownloadFile) {
        showLoadingForDownloadExcel = (
            <RotateCw className="animate-spin" size={20} />
        ); 
    }
    else
    {
        showLoadingForDownloadExcel = (
            <SheetIcon size={20} />
        ); 
    }

    const saveData = async (values: z.infer<typeof deviceLocationFormSchema>) => {
        setLoading(true);
        try {
            const deviceLocationService = new DeviceLocationService();
            const createDeviceLocationRequest = new CreateDeviceLocationRequest(
                values.NameDeviceLocation,
                values.DataUnitId
            );

            const response: ResponseResult<GetDeviceLocationsDeviceLocation> = 
                await deviceLocationService.createDeviceLocation(createDeviceLocationRequest);

            if (response.result) {
                toast.success("Success", {
                    description: "Data Lokasi Kerja berhasil tersimpan!",
                });
                setShowCreateDataUnitDialog(false); // Close the dialog
                setRefreshDataUnits(true); // Trigger data refresh
                router.push(`/devicelocations/form/${response.result.id}`);
            } else {
                const errorText = response?.error?.detail || "Failed to Create DeviceLocations";
                toast.error("Failed", {
                    description: errorText,
                });
            }
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : "Failed to handle Create DeviceLocations";
            toast.error("Failed", {
                description: errorMessage,
            });
        } finally {
            setLoading(false);
        }
    };

    let showLoadingForSaveData;
    if (loading) {
        showLoadingForSaveData = (
            <RotateCw className="animate-spin" size={20} />
        ); 
    }
    else
    {
        showLoadingForDownloadExcel = (
        <SheetIcon size={20} />
        ); 
    }

    let showLoadingForUploadExcel;
    if (loading) {
        showLoadingForUploadExcel = (
            <RotateCw className="animate-spin" size={20} />
        ); 
    }
    
    function reloadDataUnitsSelector()
    {
        setRefreshDataUnits(true); // Pass the refresh callback
        setTimeout(() => setRefreshDataUnits(false), 2000); // Reset after 2 seconds
    }
        

    const handleDownloadTemplate = async () => {
        
        setLoadingDownloadFile(true);
        
        try {
            const deviceLocationService = new DeviceLocationService(); 
            const response = await deviceLocationService.downloadDeviceLocationsTemplate();
            
            if (response?.status === 200) {
                toast.success("Success", {
                    description: "Template Excel berhasil diunduh!",
                });
                
            }
            else if (response?.data?.message) {
                toast.error("Failed", {
                    description: response.data.message,
                });
            }
            else
            {
                toast.error("Error", {
                    description: "Failed Export Main Locations",
                });
            }
        } 
        catch (error) 
        { 
            const errorMessage = error instanceof Error ? error.message : "Failed to handle Export DeviceLocations";
                toast.error("Failed", {
                    description: errorMessage,
                });
                
        } finally {
            setLoadingDownloadFile(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        setSelectedFile(file);
    };
    
    const handleUploadClick = () => {
        if (!selectedFile) {
            toast.error("Please select a file to upload.");
            return;
        }
        if (!/\.(xls|xlsx)$/.test(selectedFile.name)) {
            toast.error("Please upload a valid Excel file (.xls or .xlsx).");
            return;
        }
        // Proceed with the upload logic
    };

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-4">
            <h1 className="mb-4 text-2xl font-bold">Form Lokasi Utama Perangkat</h1>
            <DeviceLocationInfo />
            <section className="flex w-full items-center">
                <div className="w-full">
                    <Card className="p-6">
                        <Tabs className="mb-4" defaultValue="inputsingledata">
                            <TabsList className="flex gap-4 justify-center">
                                <TabsTrigger value="inputsingledata">Input Single Data</TabsTrigger>
                                <TabsTrigger value="inputmultipledata">Input Multiple Data</TabsTrigger>
                            </TabsList>
                            <TabsContent value="inputsingledata">
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
                                                    <FormLabel>Lokasi Utama Perangkat</FormLabel>
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
                            </TabsContent>
                            <TabsContent value="inputmultipledata">
                                {/* <CardContent>
                                    <p>Input Multiple Data</p>
                                </CardContent>
                                <CardFooter>
                                    <Button className="bg-blue-500 hover:bg-blue-600">Save</Button>
                                </CardFooter> */}
                                <div className="grid grid-cols-2 gap-4 p-4 shadow-md sm:rounded-lg">
                                    <div>
                                        <Label htmlFor="excel" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Upload Data Lokasi Utama Perangkat</Label>
                                        <div className="flex w-full shrink-0 flex-col items-stretch justify-start space-y-2 md:w-auto md:flex-row md:items-center md:space-x-3 md:space-y-0">
                                            
                                            <Input 
                                                id="excel" 
                                                type="file" 
                                                onChange={handleFileChange} 
                                            />
                                            <div className="flex w-full shrink-0 flex-col items-stretch justify-end space-y-2 md:w-auto md:flex-row md:items-center md:space-x-3 md:space-y-0">
                                                <Button onClick={handleUploadClick}>
                                                    {showLoadingForUploadExcel}
                                                    Upload
                                                </Button>
                                            </div>
                                        </div>
                                    </div>                                    
                                    <div className="flex w-full shrink-0 flex-col items-stretch justify-end space-y-2 md:w-auto md:flex-row md:items-end md:space-x-3 md:space-y-0">
                                        <Button className="bg-lime-500 pr-2" onClick={handleDownloadTemplate}>
                                            {showLoadingForDownloadExcel}
                                            Download Template
                                        </Button>
                                    </div>
                                </div>
                            </TabsContent>
                        </Tabs>
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
