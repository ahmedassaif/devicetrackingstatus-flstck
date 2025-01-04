/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import React, { useCallback, useEffect, useState } from "react";
import { GetDataUnitsDataUnit } from "@/api/services/types/dataUnit.types";
import { DataTable } from "@/components/data-table"; // Import your DataTable component
import { DataUnitService } from "@/api/services/spesific-services/dataUnit.service"; // Import the DataUnitService
import { PaginatedListRequest } from "@/api/services/types/commonRequest.types";
import axios, { CancelTokenSource } from "axios";
import { PaginatedListResponse, ResponseResult, SuccessResponse, toTableData } from "@/api/services/types/commonResponses.types";
import { columns } from "./columns";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CircleX, Eye, RotateCw, SearchIcon, SheetIcon, Trash2,CircleCheck, LucidePencil } from "lucide-react";
import loadingBackground from "@/public/images/beams.jpg";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { toast } from "sonner";
import DeleteDialog from "@/components/DeleteDialog";

const MainTable: React.FC = () => {

    const [dataUnits, setDataUnits] = useState<GetDataUnitsDataUnit[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [sortField, setSortField] = useState<string>("");
    const [sortOrder, setSortOrder] = useState<string>("asc"); // Default to ascending
    const [keyword, setKeyword] = useState("");
    const [query, setQuery] = useState("");
    const [hasSearched, setHasSearched] = useState<boolean>(false);
    const [rows, setRows] = useState<number>(10);
    const [loadingDownloadFile, setLoadingDownloadFile] = useState<boolean>(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [currentId, setCurrentId] = useState<string | null>(null);

    const router = useRouter(); // Move useRouter here

    const handleForm = (id: string): void => {
        router.push(`/dataunits/form/${id}`);
    };

    const handleDataUnitResponse = useCallback(
        (response: ResponseResult<PaginatedListResponse<GetDataUnitsDataUnit>>) => {
        
        if (response.error) {
            setError(response.error.detail || 'Failed to fetch DataUnits.');
            setDataUnits([]); // Clear DataUnits on error
            setTotalPages(1); // Reset total pages to default
            return;
        }
        
        if (response.result) {
            const tableData = toTableData(response.result); // Convert response using toTableData
        
            if (tableData.items.length > 0) {
            setDataUnits(tableData.items); // Update DataUnits with fetched data
            } else {
            setDataUnits([]); // Clear DataUnits when no data is returned
            }  
            setRows(tableData.totalItems);
            setTotalPages(Math.ceil(tableData.totalItems / pageSize)); // Update total pages
        } else {
            setDataUnits([]); // Clear DataUnits on unexpected response
            setTotalPages(1); // Reset total pages to default
        }
        },
        [pageSize] // Add pageSize in dependency array to ensure it triggers when pageSize changes
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        const source: CancelTokenSource = axios.CancelToken.source();

        const fetchDataUnits = async () => {
        setLoading(true);
        setError(null); // Reset previous errors on new fetch
                
            const request: PaginatedListRequest = {
                page: currentPage,
                pageSize: pageSize,
                searchText: keyword?.trim() ? keyword : undefined,
                sortField: sortField,
                sortOrder: sortOrder,
                from: undefined,
                to: undefined,
                cancelToken: source.token, // Add cancel token directly
            };
            
            try {
                const dataUnitService = new DataUnitService();
                const response: ResponseResult<PaginatedListResponse<GetDataUnitsDataUnit>> = await dataUnitService.getDataUnits({
                    ...request,
                cancelToken: source.token, // Add cancel token to the request
                });

                handleDataUnitResponse(response); // Call the improved function

            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : "Failed to handle Get DataUnits";
                toast.error("Failed", {
                    description: errorMessage,
                });
            } finally {
                setLoading(false);
            }
        };

        fetchDataUnits();

        return () => source.cancel('Request canceled by the user.');
    }, [currentPage, handleDataUnitResponse, pageSize, keyword, sortField, sortOrder]);

    const handleSort = (field: string) => {
        if (sortField === field) {
            setSortField(field);
            setSortOrder(sortOrder === "asc" ? "desc" : "asc"); // Toggle sort direction
        } else {
            setSortField(field);
            setSortOrder("asc"); // Default to ascending
        }
    };

    const searchData = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        
        // Check if the query is empty
        // if (!query.trim()) {
        //   setNotification("Search text must not be empty!");
        //   return;
        // }      
        setCurrentPage(1);
        setKeyword(query);
        setHasSearched(true); 
    };

    const handleClearInput = () => {
        if (hasSearched) {
            
            // If a search has been performed, reset the state to show default data
            setKeyword(""); // Clear the keyword
            setCurrentPage(1); // Reset to the first page
            setHasSearched(false); // Reset the search flag
            setQuery('');
    
        } else {
            // If no search has been performed, just clear the input
            setQuery('');
        }
    };

    let showLoadingForDownloadExcel;
    if (loadingDownloadFile) {
        showLoadingForDownloadExcel = (
            <RotateCw className="animate-spin" size={20} />
        ); 
    }
    else
    {
        showLoadingForDownloadExcel = (
        <SheetIcon size={20} />
        ); 
    }

    const handleExport = async () => {
    
        setLoadingDownloadFile(true);
        
        try {
            const dataUnitService = new DataUnitService(); 
            const response = await dataUnitService.exportDataUnitsToExcel();
            
            if (response?.status === 200) {
                toast.success("Success", {
                    description: "Data Lokasi Kerja berhasil diexport!",
                });
                
            }
            else if (response?.data?.message) {
                toast.error("Failed", {
                    description: response.data.message,
                });
            }
            else
            {
                toast.error("Error", {
                    description: "Failed Export DataUnits",
                });
            }
        } 
        catch (error) 
        { 
            const errorMessage = error instanceof Error ? error.message : "Failed to handle Export DataUnits";
                toast.error("Failed", {
                    description: errorMessage,
                });
                
        } finally {
            setLoadingDownloadFile(false);
        } 
    };

    const handleDelete = async (id: string) => {
        try {
            const dataUnitService = new DataUnitService();
            const response: ResponseResult<SuccessResponse> = await dataUnitService.deleteDataUnit(id);
            if (response.result) {
                setDataUnits(dataUnits.filter(unit => unit.id !== id)); // Update state to remove deleted item
                setDialogOpen(false); // Close the dialog
                toast.success("Success", {
                    description: "Data Lokasi Kerja berhasil dihapus!",
                });
                window.location.reload();
                router.push('/dataunits');
                setTotalPages(1);   
            }
            else{
                toast.error("Failed", {
                    description: response.error?.detail || "Failed to delete DataUnit",
                });
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Failed to handle delete DataUnit";
            toast.error("Failed", {
                description: errorMessage,
            });
        }
    };

    const handleClickToDelete = (DataUnitId: string) => {
        setCurrentId(DataUnitId);
        setDialogOpen(true);
      };

    return (
        <div className="container h-full">
            {loading ? (
                <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
                    <Image
                        // eslint-disable-next-line @typescript-eslint/no-require-imports
                        src={loadingBackground}
                        alt="Loading Screen"
                        fill
                        className="h-full w-full rounded-md object-cover"                        
                    />
                    <div className="relative px-6 pb-8 pt-10 shadow-xl sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
                        <div className="mx-auto max-w-md">
                            <Button disabled>
                                <RotateCw size="sm" className="animate-spin" />
                                <span className="pl-3">Loading...</span>
                            </Button>
                        </div>
                    </div>
                </div>
            ) : error ? (
                <p className="text-red-600">Error: {error}</p>
            ) : (
                <div>
                <section className="flex w-full items-center pb-2 dark:bg-gray-900">
                    <div className="w-full">
                    <div className="relative bg-white shadow-md sm:rounded-lg dark:bg-gray-800">
                        <div className="flex flex-col items-center justify-between space-y-3 p-4 md:flex-row md:space-x-4 md:space-y-0">
                        <div className="w-full md:w-1/2">
                            <form onSubmit={searchData} className="flex items-center space-x-1 pl-2">
                            <div className="relative w-full">
                                <input 
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pe-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" 
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

                            {/* Custom button */}
                            <button
                                type="submit"
                                className="rounded-full bg-blue-500 p-2 text-white hover:bg-blue-600 focus:outline-none"
                                aria-label="search"
                            >
                                <SearchIcon size={25} />
                            </button>
                            </form>
                        </div>
                        <div className="flex w-full shrink-0 flex-col items-stretch justify-end space-y-2 md:w-auto md:flex-row md:items-center md:space-x-3 md:space-y-0">
                            <Button className="bg-lime-500 pr-2" onClick={handleExport}>
                            {showLoadingForDownloadExcel}
                            Export Data Lokasi Kerja
                            </Button>
                        </div>
                        </div>
                    </div>
                    </div>
                    </section>
                    <div className="container mx-auto overflow-x-auto">
                        <DataTable
                            columns={columns.map(column => {
                                if (column.header === "Actions") {
                                    return {
                                        ...column,
                                        cell: ({ row }: { row: { original: GetDataUnitsDataUnit } }) => {
                                            const dataUnit = row.original;
                                            return (
                                                <div className="flex items-center space-x-2">
                                                    <Button
                                                        onClick={() => handleForm(dataUnit.id)} // Use handleDetail here
                                                        variant="outline" 
                                                        size="icon"
                                                        title="View details"
                                                    >
                                                        <LucidePencil />
                                                    </Button>
                                                    <Button
                                                        onClick={() => handleClickToDelete(dataUnit.id)}
                                                        variant="destructive" 
                                                        size="icon"
                                                        title="Delete Data"
                                                    >
                                                        <Trash2 />
                                                    </Button>
                                                </div>
                                            );
                                        },
                                    };
                                }
                                return column;
                            })}
                            data={dataUnits}
                            // onSort={handleSort}
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                            pageSize={pageSize}
                            rows={rows}
                            onPageSizeChange={setPageSize}
                        />
                    </div>
                    <DeleteDialog
                        isOpen={dialogOpen}
                        onOpenChange={setDialogOpen}
                        onDelete={() => handleDelete(currentId!)}
                    />
                </div>
            )}
        </div>
    );
};

export default MainTable;