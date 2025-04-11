import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

interface DetailDataButtonProps {
    onClick: () => void;
}

export const DetailDataButtonFromTable = ({ onClick }: DetailDataButtonProps) => {
    return (
        <Button
        onClick={onClick}
        variant="outline" 
        size="icon"
        title="View details"
        >
            <Eye />
        </Button>
    );
};
