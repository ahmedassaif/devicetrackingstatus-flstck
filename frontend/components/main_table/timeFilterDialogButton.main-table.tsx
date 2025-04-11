"use client";

import { FilterIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TimeFilterDialogButtonProps {
    setIsDialogOpen: (value: boolean) => void;
}

const TimeFilterDialogButton: React.FC<TimeFilterDialogButtonProps> = ({ setIsDialogOpen }) => {
    return (
        <Button variant={"outline"} onClick={() => setIsDialogOpen(true)}>
        <FilterIcon size={20} />
        Open Time Filter
        </Button>
    );
};

export default TimeFilterDialogButton;