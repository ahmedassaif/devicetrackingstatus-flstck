import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface DeleteDataButtonProps {
    onClick: () => void;
}

export const DeleteDataButtonFromTable = ({ onClick }: DeleteDataButtonProps) => {
    return (
        <Button
        onClick={onClick}
        variant="destructive" 
        size="icon"
        title="Delete"
        >
            <Trash2 />
        </Button>
    );
};