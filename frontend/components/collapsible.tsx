import React, { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
interface IProps {
    open?: boolean;
    title: string;
    children: React.ReactNode;
}

const Collapsible: React.FC<IProps> = ({ open, children, title }) => {
    const [isOpen, setIsOpen] = useState(open);

    const handleFilterOpening = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <>
        <div>
            <div>
            <div className="p-3 border-2 border-gray-200 rounded-md flex items-center justify-between overflow-hidden transition-all duration-300 ease-in-out">
                <h6 className="font-weight-bold">{title}</h6>
                <button type="button" className="btn" onClick={handleFilterOpening}>
                {!isOpen ? (
                    <ChevronDownIcon />
                ) : (
                    <ChevronUpIcon />
                )}
                </button>
            </div>
            </div>

            <div className="border-bottom">
            <div>{isOpen && <div className="p-3">{children}</div>}</div>
            </div>
        </div>
        </>
    );
};

export default Collapsible;