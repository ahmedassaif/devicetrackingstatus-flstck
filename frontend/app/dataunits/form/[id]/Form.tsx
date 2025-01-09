/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { DataUnitService } from '@/api/services/spesific-services/dataUnit.service';
import { GetDataUnitsDataUnit, DataUnitDto } from '@/api/services/types/dataUnit.types';
import { ResponseResult } from '@/api/services/types/commonResponses.types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { toast } from "sonner";
import { CircleCheck, CircleX, RotateCw } from 'lucide-react';
import loadingBackground from "@/public/images/beams.jpg";
import Image from "next/image";


interface DataUnitEditFormProps {
    dataUnitId: string;
}

const DataUnitEditForm: React.FC<DataUnitEditFormProps> = ({ dataUnitId }) => {

    const [loading, setLoading] = useState<boolean>(true);
    const [model, setModel] = useState<DataUnitDto>({ 
        id: '',
        NameUnit: '',
        Plan: ''
    });

    const router = useRouter();


    useEffect(() => {
        const fetchDataUnitDetail = async () => {
            if (!dataUnitId) return;
        
            try {
                const dataUnitService = new DataUnitService();
                const response: ResponseResult<GetDataUnitsDataUnit> = 
                await dataUnitService.getDataUnit(dataUnitId);
        
                if (response.result) {
                    setModel({
                        id: response.result.id,
                        NameUnit: response.result.NameUnit,
                        Plan: response.result.Plan || ''
                    });
                } else {
                    toast.error("Failed", {
                                        description: response.error?.detail || "Failed to fetch DataUnit detail",
                                    });
                }
            } catch (error: unknown) { 
                const errorMessage = error instanceof Error ? error.message : "Failed to handle Create DataUnits";
                                toast.error("Failed", {
                                    description: errorMessage,
                                });
            } finally {
                setLoading(false);
            }
        };
    
        fetchDataUnitDetail();

    }, [dataUnitId]); 

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setModel((prevModel) => ({ 
            ...prevModel, 
            [name]: value 
        })); 
    };

    const backToIndex = () => {
        router.push('/dataunits');
    };

    const saveData = async (e: React.FormEvent) => { 
        e.preventDefault();
        setLoading(true);

        try {
        const dataUnitService = new DataUnitService();
        const updateDataUnitRequest = {
            id: dataUnitId,
            NameUnit: model.NameUnit,
            Plan: model.Plan || ''
        };

        const response: ResponseResult<GetDataUnitsDataUnit> = 
            await dataUnitService.updateDataUnit(updateDataUnitRequest);

        if (response.result) {
            toast.success("Success", {
                description: "Data Lokasi Kerja berhasil diubah!",
            });
        } else {
            const errorText = response?.error?.detail || "Failed to Update DataUnits";
                    toast.error("Failed", {
                        description: errorText,
                    });
                    return;
        }
        } catch (error: unknown) { 
            const errorMessage = error instanceof Error ? error.message : "Failed to handle Create DataUnits";
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
        
        return (
            <div className="container mx-auto p-4">
            <h1 className="mb-4 text-2xl font-bold">Edit Lokasi Kerja</h1>
            <section className="flex w-full items-center">
                <div className="w-full">
                <Card className="p-6">
                    <form className="flex flex-col gap-4" onSubmit={saveData}>
                        <div className="space-y-2">
                            <Label htmlFor="NameUnit">Lokasi Kerja</Label>
                            <Input
                            id="NameUnit"
                            name="NameUnit"
                            value={model.NameUnit}
                            onChange={handleInputChange}
                            required
                            placeholder="Nama Unit"
                            />
                        </div>
            
                        <div className="space-y-2">
                            <Label htmlFor="Plan">Kode Plan</Label>
                            <Input
                            id="Plan"
                            name="Plan"
                            value={model.Plan}
                            onChange={handleInputChange}
                            placeholder="Kode Plan"
                            />
                        </div>
            
                        <div className="flex space-x-3">
                            <Button 
                            type="submit" 
                            className="bg-green-700 hover:bg-green-800"
                            disabled={loading}
                            >
                            {loading ? 'Saving...' : 'Save'}
                            </Button>
                            <Button 
                            type="button"
                            variant="outline"
                            onClick={backToIndex}
                            >
                            Back
                            </Button>
                        </div>
                    </form>
                </Card>
                </div>
            </section>
            </div>
        );
}

export default DataUnitEditForm;
