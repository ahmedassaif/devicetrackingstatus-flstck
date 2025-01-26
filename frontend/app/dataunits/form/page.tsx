/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState } from 'react';
import { DataUnitService } from '@/api/services/spesific-services/dataUnit.service';
import { GetDataUnitsDataUnit, DataUnitBase, emptyDataUnit } from '@/api/services/types/dataUnit.types';
import { ResponseResult } from '@/api/services/types/commonResponses.types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { toast } from "sonner";
import { CircleAlert, CircleCheck, CircleX, RotateCw } from 'lucide-react';


export default function DataUnitFormPage() {

    const [loading, setLoading] = useState<boolean>(false);
    const [model, setModel] = useState<DataUnitBase>(emptyDataUnit);

    const router = useRouter();

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
            const createDataUnitRequest = {
                NameUnit: model.NameUnit,
                Plan: model.Plan || ''
            };

            if (createDataUnitRequest.NameUnit === '') {
                toast.warning("Warning", {
                    description: "Name Unit is required",
                })
                return;
            }
            else
            {
                const response: ResponseResult<GetDataUnitsDataUnit> = 
                await dataUnitService.createDataUnit(createDataUnitRequest);
        
                if (response.result) {
                    toast.success("Success", {
                        description: "Data Lokasi Kerja berhasil tersimpan!",
                    });
                    router.push(`/dataunits/form/${response.result.id}`);
                } else {
                    const errorText = response?.error?.detail || "Failed to Create DataUnits";
                    toast.error("Failed", {
                        description: errorText,
                    });
                    return;
                }
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

    return (
            <div className="container mx-auto p-4">
            <h1 className="mb-4 text-2xl font-bold">Form Lokasi Kerja</h1>
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
                                {loading ? (<div className='flex items-center gap-2'><RotateCw className="animate-spin" size={20} /> Save</div>) : "Save"}
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