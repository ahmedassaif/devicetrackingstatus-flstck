import * as React from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface TimeSelectorProps {
    defaultHour: string;
    defaultMinute: string;
    onTimeChange: (hour: string, minute: string) => void;
}

export function TimeSelector({
    defaultHour,
    defaultMinute,
    onTimeChange,
}: TimeSelectorProps) {
    // Initialize state with default values
    const [selectedHour, setSelectedHour] = React.useState(defaultHour);
    const [selectedMinute, setSelectedMinute] = React.useState(defaultMinute);

    const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
    const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

    // Only call onTimeChange when the user explicitly changes the hour or minute
    const handleHourChange = (value: string) => {
        setSelectedHour(value);
        onTimeChange(value, selectedMinute);
    };

    const handleMinuteChange = (value: string) => {
        setSelectedMinute(value);
        onTimeChange(selectedHour, value);
    };

    return (
        <div className="flex gap-2 align-items-center">
            <Select value={selectedHour} onValueChange={handleHourChange}>
                <SelectTrigger className="w-[70px]">
                    <SelectValue placeholder="HH" />
                </SelectTrigger>
                <SelectContent style={{ minWidth: "var(--radix-select-trigger-width)" }}>
                    <SelectGroup>
                        {hours.map((hour) => (
                            <SelectItem key={hour} value={hour}>
                                {hour}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
            :
            <Select value={selectedMinute} onValueChange={handleMinuteChange}>
                <SelectTrigger className="w-[70px]">
                    <SelectValue placeholder="MM" />
                </SelectTrigger>
                <SelectContent style={{ minWidth: "var(--radix-select-trigger-width)" }}>
                    <SelectGroup>
                        {minutes.map((minute) => (
                            <SelectItem key={minute} value={minute}>
                                {minute}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}