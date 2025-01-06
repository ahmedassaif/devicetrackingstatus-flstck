"use client"


import React, { useState } from "react";
import { Calendar } from "../ui/calendar";


interface TimeRangeProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    title?: string;
    from: Date;
    to: Date;
    fromTime: string;
    toTime: string;
}

const TimeRange: React.FC<TimeRangeProps> = ({
    isOpen,
    onOpenChange,
    title,
    from,
    to,
    fromTime,
    toTime
}) => {
    const [fromDate, setFromDate] = useState<Date>(() => {
        const date = new Date();
        date.setMonth(date.getMonth() - 1);
        return date;
    });

    const [toDate, setToDate] = useState<Date>(() => {
        const date = new Date();
        return date;
    });

    const [fromTimeValue, setFromTimeValue] = useState<string>("00:00");
    const [toTimeValue, setToTimeValue] = useState<string>("23:59");
    const [hoursFrom, minutesFrom] = fromTimeValue
        .split(":")
        .map((str) => parseInt(str, 10));
        
    const [hoursTo, minutesTo] = toTimeValue
        .split(":")
        .map((str) => parseInt(str, 10));
    
    return(
            
                    <div className="time-range__input__date">
                        <Calendar
                            mode="single"
                            selected={fromDate}
                            onSelect={(date: Date | undefined) => date && setFromDate(date)}
                        />
                </div>
                

    );
}