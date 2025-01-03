/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { DeviceLocationService } from "@/api/services/spesific-services/deviceLocation.service";
import { CreateDeviceLocationRequest, GetDeviceLocationsDeviceLocation, deviceLocationFormSchema, emptyDeviceLocation } from '@/api/services/types/deviceLocation.types';
import { ResponseResult } from '@/api/services/types/commonResponses.types';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRouter } from 'next/navigation';
import { toast } from "sonner";
import { Form, FormField, FormItem, FormLabel, FormMessage, FormControl } from "@/components/ui/form";
import { DataUnitSelect } from "@/components/selectors/dataunit.selector";

export default function DeviceLocationFormPage() {
    const router = useRouter();
    const form = useForm({
        resolver: zodResolver(deviceLocationFormSchema),
        defaultValues: emptyDeviceLocation,
    });


    const saveData = async (values: z.infer<typeof deviceLocationFormSchema>) => {
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
        }
    };

    return (
        <div className="container mx-auto p-4">
        <h1 className="mb-4 text-2xl font-bold">Form Lokasi Kerja</h1>
        <section className="flex w-full items-center">
            <div className="w-full">
            <Card className="p-6">
                <Form {...form}>
                <form onSubmit={form.handleSubmit(saveData)} className="flex flex-col gap-4">
                    <FormField
                        control={form.control}
                        name="DataUnitId"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Lokasi Kerja</FormLabel>
                            <FormControl>
                                <DataUnitSelect onValueChange={(value) => form.setValue("DataUnitId", value)} value={field.value} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="NameDeviceLocation"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Lokasi Perangkat</FormLabel>
                            <FormControl>
                                <Input placeholder="Nama Lokasi Perangkat" {...field} />
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
        </div>
    );
}
