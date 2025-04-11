/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import React, { useCallback, useEffect, useState } from "react";
import { GetDeviceLocationsDeviceLocation } from "@/api/services/types/deviceLocation.types";
import { DeviceLocationService } from "@/api/services/spesific-services/deviceLocation.service"; // Import the DeviceLocationService
import { PaginatedListRequest } from "@/api/services/types/commonRequest.types";
import axios, { CancelTokenSource } from "axios";
import { PaginatedListResponse, ResponseResult, SuccessResponse, toTableData } from "@/api/services/types/commonResponses.types";
import { columns } from "./columns";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import TimeFilter from "@/components/dialog/timeFilter.dialog";
import timeFilterModel from "@/hooks/timeFilterModel";
import { format } from "date-fns";
import DeleteDialog from "@/components/dialog/confirmToDeleteData.dialog";
import { DataTable } from "@/components/main_table/dataTable.main-table";
import TableLoading from "@/components/loadings/loadToShowDataOnTable.loading";
import FormSearchDataInTable from "@/components/main_table/formSearchDataInTable.main-table";
import TimeFilterForTable from "@/components/main_table/timeFilterForTable.main-table";
import TimeFilterDialogButton from "@/components/main_table/timeFilterDialogButton.main-table";
import ExportTableButton from "@/components/main_table/exportTableButton.main-table";
import { DetailDataButtonFromTable } from "@/components/main_table/detailedDataButtonFromTable.main-table";
import { DeleteDataButtonFromTable } from "@/components/main_table/deleteDataFromTable.main-table";

const MainTable: React.FC = () => {

    const [deviceLocations, setDeviceLocations] = useState<GetDeviceLocationsDeviceLocation[]>([]);
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
    const [dialogDeleteOpen, setDialogDeleteOpen] = useState(false);
    const [currentId, setCurrentId] = useState<string | null>(null);
    const [isTimeFilterDialogOpen, setIsTimeFilterDialogOpen] = useState(false);
    const [filterModel, setFilterModel] = useState(timeFilterModel);

    const router = useRouter(); // Move useRouter here

    const handleForm = (id: string): void => {
        router.push(`/devicelocations/form/${id}`);
    };

    const handleDeviceLocationResponse = useCallback(
        (response: ResponseResult<PaginatedListResponse<GetDeviceLocationsDeviceLocation>>) => {
        
        if (response.error) {
            setError(response.error.detail || 'Failed to fetch DeviceLocations.');
            setDeviceLocations([]); // Clear DeviceLocations on error
            setTotalPages(1); // Reset total pages to default
            return;
        }
        
        if (response.result) {
            const tableData = toTableData(response.result); // Convert response using toTableData
        
            if (tableData.items.length > 0) {
            setDeviceLocations(tableData.items); // Update DeviceLocations with fetched data
            } else {
            setDeviceLocations([]); // Clear DeviceLocations when no data is returned
            }  
            setRows(tableData.totalItems);
            setTotalPages(Math.ceil(tableData.totalItems / pageSize)); // Update total pages
        } else {
            setDeviceLocations([]); // Clear DeviceLocations on unexpected response
            setTotalPages(1); // Reset total pages to default
        }
        },
        [pageSize] // Add pageSize in dependency array to ensure it triggers when pageSize changes
    );

    const formatDateToCustomFormat = (date: Date): string => {
                return format(date, "yyyy-MM-dd HH:mm:ss");
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        const source: CancelTokenSource = axios.CancelToken.source();

        const fetchDeviceLocations = async () => {
            setLoading(true);
            setError(null); // Reset previous errors on new fetch

            const fromDateFormatted = formatDateToCustomFormat(filterModel.from);
            const toDateFormatted = formatDateToCustomFormat(filterModel.to);
                
            const request: PaginatedListRequest = {
                page: currentPage,
                pageSize: pageSize,
                searchText: keyword?.trim() ? keyword : undefined,
                sortField: sortField,
                sortOrder: sortOrder,
                from: fromDateFormatted, // Use the `from` value from filterModel
                to: toDateFormatted, // Use the `to` value from filterModel
                cancelToken: source.token, // Add cancel token directly
            };
            
            try {
                const deviceLocationService = new DeviceLocationService();
                const response: ResponseResult<PaginatedListResponse<GetDeviceLocationsDeviceLocation>> = await deviceLocationService.getDeviceLocations({
                    ...request,
                cancelToken: source.token, // Add cancel token to the request
                });

                handleDeviceLocationResponse(response); // Call the improved function

            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : "Failed to handle Get DeviceLocations";
                toast.error("Failed", {
                    description: errorMessage,
                });
            } finally {
                setLoading(false);
            }
        };

        fetchDeviceLocations();

        return () => source.cancel('Request canceled by the user.');
    }, [currentPage, handleDeviceLocationResponse, pageSize, keyword, sortField, sortOrder, filterModel]);

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

    const handleExport = async () => {
    
        setLoadingDownloadFile(true);
        
        try {
            const deviceLocationService = new DeviceLocationService(); 
            const response = await deviceLocationService.exportDeviceLocationsToExcel();
            
            if (response?.status === 200) {
                toast.success("Success", {
                    description: "Data Lokasi Perangkat berhasil diexport!",
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
                    description: "Failed Export Main Locations",
                });
            }
        } 
        catch (error) 
        { 
            const errorMessage = error instanceof Error ? error.message : "Failed to handle Export DeviceLocations";
                toast.error("Failed", {
                    description: errorMessage,
                });
                
        } finally {
            setLoadingDownloadFile(false);
        } 
    };

    const handleDelete = async (id: string) => {
        try {
            const deviceLocationService = new DeviceLocationService();
            const response: ResponseResult<SuccessResponse> = await deviceLocationService.deleteDeviceLocation(id);
            if (response.result) {
                setDeviceLocations(deviceLocations.filter(unit => unit.id !== id)); // Update state to remove deleted item
                setDialogDeleteOpen(false); // Close the dialog
                toast.success("Success", {
                    description: "Data Lokasi Perangkat berhasil dihapus!",
                });
                window.location.reload();
                router.push('/devicelocations');
                setTotalPages(1);   
            }
            else{
                toast.error("Failed", {
                    description: response.error?.detail || "Failed to delete DeviceLocation",
                });
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Failed to handle delete DeviceLocation";
            toast.error("Failed", {
                description: errorMessage,
            });
        }
    };

    const handleClickToDelete = (DeviceLocationId: string) => {
        setCurrentId(DeviceLocationId);
        setDialogDeleteOpen(true);
    };

    return (
        <div className="container h-full">
            {loading ? (
                <TableLoading />
            ) : error ? (
                <p className="text-red-600">Error: {error}</p>
            ) : (
                <div>
                    <div className="grid grid-cols-3 gap-4 p-4 shadow-md sm:rounded-lg">
                        <div>
                            <div className="flex w-full shrink-0 flex-col items-stretch justify-start space-y-2 md:w-auto md:flex-row md:items-center md:space-x-3 md:space-y-0">
                                <FormSearchDataInTable 
                                    query={query}
                                    setQuery={setQuery}
                                    searchData={searchData}
                                    handleClearInput={handleClearInput}
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-center">
                            <TimeFilterForTable filterModel={filterModel} />
                        </div>
                        <div>
                            <div className="flex w-full shrink-0 flex-col items-stretch justify-end space-y-2 md:w-auto md:flex-row md:items-center md:space-x-3 md:space-y-0">
                                <TimeFilterDialogButton setIsDialogOpen={() => setIsTimeFilterDialogOpen(true)} />
                                <ExportTableButton handleExport={handleExport} loadingDownloadFile={loadingDownloadFile} nameTable="Main Location" />
                            </div>                    
                        </div>
                    </div>
                    <div className="container mx-auto pt-4 overflow-x-auto">
                        <DataTable
                            columns={columns.map(column => {
                                if (column.header === "Actions") {
                                    return {
                                        ...column,
                                        cell: ({ row }: { row: { original: GetDeviceLocationsDeviceLocation } }) => {
                                            const deviceLocation = row.original;
                                            return (
                                                <div className="flex items-center space-x-2">
                                                    <DetailDataButtonFromTable onClick={() => handleForm(deviceLocation.id)} />
                                                    <DeleteDataButtonFromTable onClick={() => handleClickToDelete(deviceLocation.id)} />
                                                </div>
                                            );
                                        },
                                    };
                                }
                                return column;
                            })}
                            data={deviceLocations}
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
                        isOpen={dialogDeleteOpen}
                        onOpenChange={setDialogDeleteOpen}
                        onDelete={() => handleDelete(currentId!)}
                    />
                    {/* Render the TimeFilter dialog */}
                    <TimeFilter
                        isOpen={isTimeFilterDialogOpen}
                        onOpenChange={setIsTimeFilterDialogOpen}
                        title="Set Time Filter"
                        timeFilterModel={filterModel} // Pass the current model
                        onUpdateModel={(updatedModel) => {
                            setFilterModel(updatedModel); // Update the model in the parent component
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default MainTable;