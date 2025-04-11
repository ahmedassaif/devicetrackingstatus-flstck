"use client";

import { Button } from "@/components/ui/button";
import { RotateCw, SheetIcon } from "lucide-react";

interface ExportTableButtonProps {
    handleExport: () => void;
    loadingDownloadFile: boolean;
    nameTable: string;
}

const ExportTableButton: React.FC<ExportTableButtonProps> = ({ handleExport, loadingDownloadFile, nameTable }) => {
    return (
        <Button
            variant="outline"
            onClick={handleExport}
            disabled={loadingDownloadFile}
            className="flex items-center bg-lime-500 gap-2"
        >
            <div className='flex items-center gap-2'>
                {loadingDownloadFile ? (
                    <RotateCw className="animate-spin" size={20} />
                ) : (
                    <SheetIcon size={20} />
                )}
                Export {nameTable}
            </div>
        </Button>
    );
};

export default ExportTableButton;