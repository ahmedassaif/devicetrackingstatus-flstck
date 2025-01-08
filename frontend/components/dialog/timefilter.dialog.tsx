/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"


import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import {TimeInput} from "@nextui-org/date-input";
import { TimeValue } from '@react-types/datepicker';
import timeFilterModel from '@/hooks/timeFilterModel';
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react";
import { AnyTime, CycleTimeOptions, Time, TimeDuration, TimeField, TimeFields } from "@internationalized/date";
import { TimeSelector } from "@/components/selectors/time.selector"; // Import TimeSelector

interface TimeFilterProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    title?: string;
    timeFilterModel: typeof timeFilterModel; // Pass the model directly
    onUpdateModel: (updatedModel: typeof timeFilterModel) => void; // Callback to notify parent of changes
}

const TimeFilter: React.FC<TimeFilterProps> = ({
    isOpen,
    onOpenChange,
    title,
    timeFilterModel,
    onUpdateModel, // Destructure the new prop
}) => {

    const [fromPopoverOpen, setFromPopoverOpen] = useState(false); 
    const [toPopoverOpen, setToPopoverOpen] = useState(false);

    const [fromDate, setFromDate] = useState<Date>(() => {
        const date = timeFilterModel.fromDate;
        return date;
    });

    const [toDate, setToDate] = useState<Date>(() => {
        const date = timeFilterModel.toDate;
        return date;
    });

    const [fromTimeValue, setFromTimeValue] = useState<Time>(timeFilterModel.fromTime);
    const [toTimeValue, setToTimeValue] = useState<Time>(timeFilterModel.toTime);

    useEffect(() => {
        if (isOpen) {
            setFromDate(timeFilterModel.fromDate);
            setToDate(timeFilterModel.toDate);
            setFromTimeValue(timeFilterModel.fromTime);
            setToTimeValue(timeFilterModel.toTime);
        }
    }, [isOpen, timeFilterModel]);

    const handleTimeChange = (
        type: 'from' | 'to', 
        hour: string, 
        minute: string) => { 
            
            const timeValue = new Time(parseInt(hour), parseInt(minute), 0);
            
            if (type === 'from') { 
                setFromTimeValue(timeValue); 
            } else { 
                setToTimeValue(timeValue); 
            }
        }

    const handleSetFilter = () => {
        if (fromDate && fromTimeValue && toDate && toTimeValue) {
            // Combine fromDate and fromTime into a single DateTime
            const fromDateTime = new Date(
                fromDate.getFullYear(),
                fromDate.getMonth(),
                fromDate.getDate(),
                fromTimeValue.hour,
                fromTimeValue.minute
            );

            // Combine toDate and toTime into a single DateTime
            const toDateTime = new Date(
                toDate.getFullYear(),
                toDate.getMonth(),
                toDate.getDate(),
                toTimeValue.hour,
                toTimeValue.minute
            );

            // Update the timeFilterModel
            const updatedModel = {
                ...timeFilterModel,
                fromDate,
                fromTime: fromTimeValue,
                toDate,
                toTime: toTimeValue,
                from: fromDateTime,
                to: toDateTime,
            };

            // Notify the parent component of the updated model
            onUpdateModel(updatedModel);

            // Close the dialog
            onOpenChange(false);
        } else {
            alert("Please fill in all fields.");
        }
    };  
    
    return(
                
        <div>
            <Dialog open={isOpen} onOpenChange={onOpenChange}>
                <DialogContent className="sm:max-w-[700px]" aria-describedby="Time Filter">
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                    </DialogHeader>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="rounded p-4">
                                <h2 className="font-bold">Date From</h2>
                                <Popover open={fromPopoverOpen} onOpenChange={setFromPopoverOpen}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-full justify-start text-left font-normal",
                                                !fromDate && "text-muted-foreground"
                                                )}
                                            onClick={() => setFromPopoverOpen(true)}
                                        >
                                            <CalendarIcon />
                                            {fromDate ? format(fromDate, "PPP") : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-full p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={fromDate}
                                            onSelect={(date: Date | undefined) => {
                                                date && setFromDate(date);
                                                setFromPopoverOpen(false);
                                            }}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <div className="rounded p-4">
                                <h2 className="font-bold">Date To</h2>
                                <Popover open={toPopoverOpen} onOpenChange={setToPopoverOpen}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                        "w-full justify-start text-left font-normal",
                                                        !toDate && "text-muted-foreground"
                                                    )}
                                            onClick={() => setToPopoverOpen(true)}
                                        >
                                            <CalendarIcon />
                                            {toDate ? format(toDate, "PPP") : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                        mode="single"
                                        selected={toDate}
                                        onSelect={(date: Date | undefined) => {
                                            date && setToDate(date);
                                            setToPopoverOpen(false);
                                        }}
                                        initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <div className="rounded p-4">
                                <h2 className="font-bold">Time From</h2> 
                                <TimeSelector 
                                    defaultHour={fromTimeValue.hour.toString().padStart(2, '0')} 
                                    defaultMinute={fromTimeValue.minute.toString().padStart(2, '0')} 
                                    onTimeChange={(hour: string, minute: string) => handleTimeChange('from', hour, minute)} 
                                />
                                {/* <TimeInput 
                                    label="Time From" 
                                    onChange={(timeValue) => timeValue && setFromTimeValue(timeValue)}
                                    defaultValue={fromTimeValue}
                                    isInvalid
                                    errorMessage={(value) => {
                                        if (value.isInvalid) {
                                        return "Please enter a valid time";
                                        }
                                    }}
                                /> */}
                            </div>
                            <div className="rounded p-4">
                                <h2 className="font-bold">Time To</h2>
                                <TimeSelector 
                                    defaultHour={toTimeValue.hour.toString().padStart(2, '0')} 
                                    defaultMinute={toTimeValue.minute.toString().padStart(2, '0')} 
                                    onTimeChange={(hour: string, minute: string) => handleTimeChange('to', hour, minute)} 
                                />
                            </div>
                        </div>
                    <DialogFooter>
                        <div className="flex justify-end space-x-2">
                            <Button variant="outline" onClick={() => onOpenChange(false)}>
                                Cancel
                            </Button>
                            <Button variant="default" onClick={handleSetFilter}>
                                Set Filter
                            </Button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div> 
    );
}

export default TimeFilter;