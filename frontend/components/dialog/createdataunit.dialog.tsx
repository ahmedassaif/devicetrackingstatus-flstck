/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { DataUnitService } from "@/api/services/spesific-services/dataUnit.service";
import { ResponseResult } from "@/api/services/types/commonResponses.types";
import { CreateDataUnitRequest, DataUnitBase, emptyDataUnit, GetDataUnitsDataUnit } from "@/api/services/types/dataUnit.types";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RotateCw } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface CreateDataUnitDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess: () => void; // New callback prop
}

const CreateDataUnitDialog: React.FC<CreateDataUnitDialogProps> = ({ isOpen, onOpenChange, onSuccess }) => {
    
    const [loading, setLoading] = useState<boolean>(false);
    const [model, setModel] = useState<DataUnitBase>(emptyDataUnit);
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
        const { name, value } = e.target; 
        setModel((prevModel) => ({ 
            ...prevModel, 
            [name]: value 
        })); 
    };

    const saveData = async (e: React.FormEvent) => { 
        e.preventDefault();
        setLoading(true);
    
        try {
            const dataUnitService = new DataUnitService();
            const createDataUnitRequest = new CreateDataUnitRequest(
                model.NameUnit,
                model.Plan || ''
            );

            if (createDataUnitRequest.NameUnit === '') {
                toast.warning("Warning", {
                    description: "Name Unit is required",
                })
                return;
            } else {
                const response: ResponseResult<GetDataUnitsDataUnit> = 
                await dataUnitService.createDataUnit(createDataUnitRequest);
        
                if (response.result) {
                    toast.success("Success", {
                        description: "Data Lokasi Kerja berhasil tersimpan!",
                    });
                    onSuccess(); // Call the success callback
                    onOpenChange(false); // Close the dialog
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
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Lokasi Kerja</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Nama
                        </Label>
                        <Input
                            id="NameUnit"
                            name="NameUnit"
                            value={model.NameUnit}
                            onChange={handleInputChange}
                            required
                            placeholder="Nama Lokasi Kerja"
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Kode Plan
                        </Label>
                        <Input
                            id="Plan"
                            name="Plan"
                            value={model.Plan}
                            onChange={handleInputChange}
                            placeholder="Kode Plan"
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button variant="default" onClick={saveData} disabled={loading}>
                            {loading ? (
                                <div className='flex items-center gap-2'>
                                    <RotateCw className="animate-spin" size={20} />
                                    Saving...
                                </div>
                            ) : "Save"}
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default CreateDataUnitDialog;
