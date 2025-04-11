/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import React, { useCallback, useEffect, useState } from "react";
import { GetAuditsAudit } from "@/api/services/types/audit.types";
import { AuditService } from "@/api/services/spesific-services/audit.service"; // Import the AuditService
import { PaginatedListRequest } from "@/api/services/types/commonRequest.types";
import axios, { CancelTokenSource } from "axios";
import { PaginatedListResponse, ResponseResult, toTableData } from "@/api/services/types/commonResponses.types";
import { columns } from "./columns";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import TimeFilter from "@/components/dialog/timeFilter.dialog";
import timeFilterModel from "@/hooks/timeFilterModel";
import { format } from "date-fns";
import FormSearchDataInTable from "@/components/main_table/formSearchDataInTable.main-table";
import TimeFilterForTable from "@/components/main_table/timeFilterForTable.main-table";
import TimeFilterDialogButton from "@/components/main_table/timeFilterDialogButton.main-table";
import ExportTableButton from "@/components/main_table/exportTableButton.main-table";
import { DetailDataButtonFromTable } from "@/components/main_table/detailedDataButtonFromTable.main-table";
import { DataTable } from "@/components/main_table/dataTable.main-table";
import TableLoading from "@/components/loadings/loadToShowDataOnTable.loading";

const MainTable: React.FC = () => {
    const [audits, setAudits] = useState<GetAuditsAudit[]>([]);
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
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [filterModel, setFilterModel] = useState(timeFilterModel);

    const router = useRouter(); // Move useRouter here

    // Define handleDetail inside the component
    const handleDetail = (id: number): void => {
        router.push(`/audits/detail/${id}`);
    };

     // Memoize handleAuditResponse to avoid unnecessary re-renders
    const handleAuditResponse = useCallback(
        (response: ResponseResult<PaginatedListResponse<GetAuditsAudit>>) => {
        
            if (response.error) {
                setError(response.error.detail || 'Failed to fetch audits.');
                setAudits([]); // Clear audits on error
                setTotalPages(1); // Reset total pages to default
                return;
            }
            
            if (response.result) {
                const tableData = toTableData(response.result); // Convert response using toTableData
            
                if (tableData.items.length > 0) {
                    setAudits(tableData.items); // Update audits with fetched data
                } else {
                    setAudits([]); // Clear audits when no data is returned
                }  
                
                setRows(tableData.totalItems);
                setTotalPages(Math.ceil(tableData.totalItems / pageSize)); // Update total pages
            } else {
                setAudits([]); // Clear audits on unexpected response
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

        const fetchAudits = async () => {
            setLoading(true);
            setError(null); // Reset previous errors on new fetch
            
            // Example usage
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

            console.log(request);
            
            try {
                const auditService = new AuditService();
                const response: ResponseResult<PaginatedListResponse<GetAuditsAudit>> = await auditService.getAudits({
                    ...request,
                cancelToken: source.token, // Add cancel token to the request
                });
        
                handleAuditResponse(response); // Call the improved function
        
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : "Failed to handle load Audits";
                toast.error("Failed", {
                    description: errorMessage,
                });
            } finally {
                setLoading(false);
            }
        };
        
        fetchAudits();

        return () => source.cancel('Request canceled by the user.');
    }, [currentPage, handleAuditResponse, pageSize, keyword, sortField, sortOrder, filterModel]);

    

    const handleSort = (field: string) => {
        if (sortField === field) {
            setSortField(field);
            setSortOrder(sortOrder === "asc" ? "desc" : "asc"); // Toggle sort direction
        } else {
            setSortField(field);
            setSortOrder("asc"); // Default to ascending
        }
    };

    // const searchData = (e: { preventDefault: () => void }) => {
    //     e.preventDefault();
        
    //     // Check if the query is empty
    //     // if (!query.trim()) {
    //     //   setNotification("Search text must not be empty!");
    //     //   return;
    //     // }      
    //     setCurrentPage(1);
    //     setKeyword(query);
    //     setHasSearched(true); 
    // };
    const searchData = useCallback((e: { preventDefault: () => void }) => {
        e.preventDefault();
        setCurrentPage(1);
        setKeyword(query);
        setHasSearched(true); 
    }, [query]);
    
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
    // const handleClearInput = useCallback(() => {
    //     if (hasSearched) {
    //         setKeyword("");
    //         setCurrentPage(1);
    //         setHasSearched(false);
    //         setQuery('');
    //     } else {
    //         setQuery('');
    //     }
    // }, [hasSearched]);


    const handleExport = async () => {
    
        setLoadingDownloadFile(true);
        
        try {
            const auditService = new AuditService(); 
            const response = await auditService.exportAuditsToExcel(); 

            if (response?.status === 200) {
                toast.success("Success", {
                    description: "Data Audit berhasil diexport!",
                    position: "top-left",
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
                    description: "Failed Export Audits",
                });
            }
        } 
        catch (error) 
        {
            const errorMessage = error instanceof Error ? error.message : "Failed to handle Export Audits";
                        toast.error("Handler Failed", {
                            description: errorMessage,
                        });
        } finally {
        setLoadingDownloadFile(false);
        } 
    };

    return (
        <div>
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
                                        <TimeFilterDialogButton setIsDialogOpen={setIsDialogOpen} />
                                        <ExportTableButton handleExport={handleExport} loadingDownloadFile={loadingDownloadFile} nameTable="Audits" />
                                    </div>
                        </div>
                    </div>
                    <div className="container mx-auto pt-4 overflow-x-auto">
                        <DataTable
                            columns={columns.map(column => {
                                if (column.header === "Actions") {
                                    return {
                                        ...column,
                                        cell: ({ row }: { row: { original: GetAuditsAudit } }) => {
                                            const audit = row.original;
                                            return (
                                                <div className="flex space-x-2">
                                                    <DetailDataButtonFromTable onClick={() => handleDetail(audit.id)} />
                                                </div>
                                            );
                                        },
                                    };
                                }
                                return column;
                            })}
                            data={audits}
                            // onSort={handleSort}
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                            pageSize={pageSize}
                            rows={rows}
                            onPageSizeChange={setPageSize}
                        />
                    </div>
                </div>
            )}
            {/* Render the TimeFilter dialog */}
            <TimeFilter
                isOpen={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                title="Set Time Filter"
                timeFilterModel={filterModel} // Pass the current model
                onUpdateModel={(updatedModel) => {
                    setFilterModel(updatedModel); // Update the model in the parent component
                }}
            />
        </div>
    );
};

const AuditMainTable = () => {
    return (
        <div className="container mx-auto h-full">
            <MainTable />
        </div>
    );
};

export default AuditMainTable;