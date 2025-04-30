"use client";
import timeFilterModel from "@/hooks/timeFilterModel";

interface TimeFilterProps {
    filterModel: typeof timeFilterModel;
}

const TimeFilterForTable: React.FC<TimeFilterProps> = ({ filterModel }) => {
    return (
        <div className="flex items-center justify-center text-wrap">
        <p>
            Data from <b>{filterModel.from.toLocaleString()}</b> to{' '}
            <b>{filterModel.to.toLocaleString()}</b>
        </p>
        </div>
    );
};

export default TimeFilterForTable;