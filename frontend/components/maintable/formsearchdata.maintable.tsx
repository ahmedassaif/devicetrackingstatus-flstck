"use client";

import { SearchIcon, CircleX } from "lucide-react";

interface FormSearchDataProps {
    query: string;
    setQuery: (query: string) => void;
    searchData: (e: { preventDefault: () => void }) => void;
    handleClearInput: () => void;
}

const FormSearchDataInTable: React.FC<FormSearchDataProps> = ({
    query, 
    setQuery, 
    searchData, 
    handleClearInput 
}) => {
    console.log("FormSearchDataInTable");
    return (
        <form onSubmit={searchData} className="flex items-center space-x-1">
            <div className="relative w-full">
            <input 
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" 
                placeholder="Ketik pencarian disini..." />
            {query && (
                <div className="absolute inset-y-0 end-0 flex items-center pe-3.5">
                <CircleX
                    className="cursor-pointer" 
                    onClick={handleClearInput} 
                    size={20} 
                />
                </div>
            )}
            </div>
            <button
            type="submit"
            className="rounded-full bg-blue-500 p-2 text-white hover:bg-blue-600 focus:outline-none"
            aria-label="search"
            >
            <SearchIcon size={25} />
            </button>
        </form>
    );
};

export default FormSearchDataInTable;