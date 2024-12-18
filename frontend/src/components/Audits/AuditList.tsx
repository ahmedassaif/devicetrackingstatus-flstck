import React, { useCallback, useEffect, useState } from 'react';
import { Spinner, Select, Button, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, TextInput } from 'flowbite-react'; // Flowbite component
import { GetAuditsRequest } from '../../services/Audits/Requests/GetAuditsRequest';
import { GetAuditsAudit } from '../../services/Audits/Requests/GetAuditsAudit';
import { ResponseResult } from '../../services/Responses/ResponseResult';
import { PaginatedListResponse } from '../../services/Responses/PaginatedListResponse';
import AuditService from '../../services/Audits/AuditService';
import { toTableData } from '../../services/utils/PaginatedListResponseExtensions';
import axios, { CancelTokenSource } from 'axios';
import { FiEye, FiSearch } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import { FaFileExcel, FaSort, FaSortAlphaDown, FaSortAlphaUp } from 'react-icons/fa'
import { IoMdCloseCircle } from "react-icons/io";
import { Console } from 'console';

const AuditList: React.FC = () => {

  const [audits, setAudits] = useState<GetAuditsAudit[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [rows, setRows] = useState<number>(10);
  const [query, setQuery] = useState("");
  const [keyword, setKeyword] = useState("");
  const [loadingDownloadFile, setLoadingDownloadFile] = useState<boolean>(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [sortField, setSortField] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<string>("");
  const navigate = useNavigate();
  const [sortingButtonForEvent, setSortingButtonForEvent] = useState<JSX.Element>(<FaSort className='cursor-pointer' onClick={(e) => getSortFromField("event", "asc", e)} />);
  const [sortingButtonForUserType, setSortingButtonForUserType] = useState<JSX.Element>(<FaSort className='cursor-pointer' onClick={(e) => getSortFromField("user_type", "asc", e)} />);
  const [sortingButtonForAuditableType, setSortingButtonForAuditableType] = useState<JSX.Element>(<FaSort className='cursor-pointer' onClick={(e) => getSortFromField("auditable_type", "asc", e)} />);

  function getSortFromField(nameField: string, sortOrderBy: string, e: { preventDefault: () => void }){
    
    e.preventDefault();

    if (nameField && sortOrderBy) {
      if (nameField === 'user_type') {
        if (sortOrderBy === 'asc') {
          setSortingButtonForUserType(<FaSortAlphaUp className='cursor-pointer' onClick={(e) => getSortFromField("user_type", "desc", e)} />);      
        }
        else if (sortOrderBy === 'desc') {
          setSortingButtonForUserType(<FaSortAlphaDown className='cursor-pointer' onClick={(e) => getSortFromField("", "", e)} />);
        }
        setSortingButtonForAuditableType(<FaSort className='cursor-pointer' onClick={(e) => getSortFromField("auditable_type", "asc", e)} />);
        setSortingButtonForEvent(<FaSort className='cursor-pointer' onClick={(e) => getSortFromField("event", "asc", e)} />);
      }
      else if (nameField === 'auditable_type') {
        if (sortOrderBy === 'asc') {
          setSortingButtonForAuditableType(<FaSortAlphaUp className='cursor-pointer' onClick={(e) => getSortFromField("auditable_type", "desc", e)} />);
        }
        else if (sortOrderBy === 'desc') {
          setSortingButtonForAuditableType(<FaSortAlphaDown className='cursor-pointer' onClick={(e) => getSortFromField("", "", e)} />);
        }
        setSortingButtonForUserType(<FaSort className='cursor-pointer' onClick={(e) => getSortFromField("user_type", "asc", e)} />);
        setSortingButtonForEvent(<FaSort className='cursor-pointer' onClick={(e) => getSortFromField("event", "asc", e)} />);
      } 
      else if (nameField === 'event') {
        if (sortOrderBy === 'asc') {
          setSortingButtonForEvent(<FaSortAlphaUp className='cursor-pointer' onClick={(e) => getSortFromField("event", "desc", e)} />);
        }
        else if (sortOrderBy === 'desc') {
          setSortingButtonForEvent(<FaSortAlphaDown className='cursor-pointer' onClick={(e) => getSortFromField("", "", e)} />);
        }

        setSortingButtonForUserType(<FaSort className='cursor-pointer' onClick={(e) => getSortFromField("user_type", "asc", e)} />);
        setSortingButtonForAuditableType(<FaSort className='cursor-pointer' onClick={(e) => getSortFromField("auditable_type", "asc", e)} />);
      }

      setSortDirection(sortOrderBy);
      setSortField(nameField);
      
    }
    else{
      setSortingButtonForUserType(<FaSort className='cursor-pointer' onClick={(e) => getSortFromField("user_type", "asc", e)} />);
      setSortingButtonForAuditableType(<FaSort className='cursor-pointer' onClick={(e) => getSortFromField("auditable_type", "asc", e)} />);
      setSortingButtonForEvent(<FaSort className='cursor-pointer' onClick={(e) => getSortFromField("event", "asc", e)} />);
      setSortDirection("");
      setSortField("");
    }

    setCurrentPage(1);
  }

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

  useEffect(() => {
    const source: CancelTokenSource = axios.CancelToken.source();
  
    const fetchAudits = async () => {
      setLoading(true);
      setError(null); // Reset previous errors on new fetch
            
      const request: GetAuditsRequest = {
        page: currentPage,
        pageSize: pageSize,
        searchText: keyword?.trim() ? keyword : undefined,
        sortField: sortField,
        sortOrder: sortDirection,
        from: undefined,
        to: undefined,
        cancelToken: source.token, // Add cancel token directly
      };
    
      try {
        const auditService = new AuditService();
        const response: ResponseResult<PaginatedListResponse<GetAuditsAudit>> = await auditService.getAudits({
          ...request,
          cancelToken: source.token, // Add cancel token to the request
        });

        handleAuditResponse(response); // Call the improved function

      } catch (err: any) {
        setError(err.message || 'An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    };
    
  
    fetchAudits();
  
    return () => source.cancel('Request canceled by the user.');
  }, [currentPage, handleAuditResponse, pageSize, keyword, sortField, sortDirection]);
  

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  };

  // Handle page size change
  const handlePageSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newPageSize = parseInt(event.target.value, 10);
    setPageSize(newPageSize);
    setCurrentPage(1); // Reset to first page when page size changes

    setSortingButtonForUserType(<FaSort className='cursor-pointer' onClick={(e) => getSortFromField("user_type", "asc", e)} />);
    setSortingButtonForAuditableType(<FaSort className='cursor-pointer' onClick={(e) => getSortFromField("auditable_type", "asc", e)} />);
    setSortingButtonForEvent(<FaSort className='cursor-pointer' onClick={(e) => getSortFromField("event", "asc", e)} />);
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
          <Button>
            <Spinner size="sm" />
            <span className="pl-3">Loading...</span>
          </Button>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-600">Error: {error}</p>;
  }
  
  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 || // Always show the first page
        i === totalPages || // Always show the last page
        (i >= currentPage - 1 && i <= currentPage + 1) // Show pages around the current page
      ) {
        pages.push(
          <button
            key={i}
            className={`${
              i === currentPage
                ? 'border-blue-500 bg-blue-500 text-white'
                : 'border-gray-300 bg-gray-100 hover:bg-gray-200'
            } inline-flex border px-4 py-2`}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </button>
        );
      } else if (
        (i === currentPage - 2 && currentPage > 3) || // Ellipsis before the current page
        (i === currentPage + 2 && currentPage < totalPages - 2) // Ellipsis after the current page
      ) {
        pages.push(
          <span key={i} className="px-4 py-2">
            ...
          </span>
        );
      }
    }
    return pages;
  };

  const startIndex = (currentPage - 1) * pageSize + 1;
  const endIndex = Math.min(currentPage * pageSize, rows);

  const searchData = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    
    // Check if the query is empty
    if (!query.trim()) {
      setNotification("Search text must not be empty!");
      return;
    }
  
    setCurrentPage(1);
    setKeyword(query);
    setHasSearched(true); 

    setSortingButtonForUserType(<FaSort className='cursor-pointer' onClick={(e) => getSortFromField("user_type", "asc", e)} />);
    setSortingButtonForAuditableType(<FaSort className='cursor-pointer' onClick={(e) => getSortFromField("auditable_type", "asc", e)} />);
    setSortingButtonForEvent(<FaSort className='cursor-pointer' onClick={(e) => getSortFromField("event", "asc", e)} />);
  };

  const handleDetailClick = (auditId: number) => {
    navigate(`/Audit/Details/${auditId}`);  // Navigate to the detail page
  };
  
  const handleExport = async () => {
    
    setLoadingDownloadFile(true);
    
    try {
      const auditService = new AuditService(); 
      await auditService.exportAuditsToExcel(); 
    } 
    catch (error) 
    { 
      console.error('Failed to export audits', error); 
    }
    finally{
      setLoadingDownloadFile(false);
    } 
  };

  let showLoadingForDownloadExcel;
  if (loadingDownloadFile) {
    showLoadingForDownloadExcel = (
      <Spinner className="mr-2 size-5" />
    ); 
  }
  else
  {
    showLoadingForDownloadExcel = (
      <FaFileExcel className="mr-2 size-5" />
    ); 
  }

  const handleClearInput = () => {
    if (hasSearched) {
      // If a search has been performed, reset the state to show default data
      setKeyword(""); // Clear the keyword
      setCurrentPage(1); // Reset to the first page
      setHasSearched(false); // Reset the search flag
      setQuery('');

      setSortingButtonForUserType(<FaSort className='cursor-pointer' onClick={(e) => getSortFromField("user_type", "asc", e)} />);
      setSortingButtonForAuditableType(<FaSort className='cursor-pointer' onClick={(e) => getSortFromField("auditable_type", "asc", e)} />);
      setSortingButtonForEvent(<FaSort className='cursor-pointer' onClick={(e) => getSortFromField("event", "asc", e)} />);
    } else {
      // If no search has been performed, just clear the input
      setQuery('');
    }
  };

  return (
      <div className="container mx-auto h-svh">
        <h1 className="mb-4 text-2xl font-bold">Audit List</h1>
        <section className="flex items-center pb-2 dark:bg-gray-900">
          <div className="mx-auto w-full">
            <div className="relative bg-white shadow-md sm:rounded-lg dark:bg-gray-800">
              <div className="flex flex-col items-center justify-between space-y-3 p-4 md:flex-row md:space-x-4 md:space-y-0">
                <div className="w-full md:w-1/2">
                  <form onSubmit={searchData} className="flex items-center space-x-1 pl-2">
                    <div className="relative">
                      <input 
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pe-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" 
                        placeholder="Ketik pencarian disini..." />
                      {query && (
                        <div className="absolute inset-y-0 end-0 flex items-center pe-3.5">
                        <IoMdCloseCircle
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
                      <FiSearch size={25} />
                    </button>
                  </form>
                </div>
                <div className="flex w-full shrink-0 flex-col items-stretch justify-end space-y-2 md:w-auto md:flex-row md:items-center md:space-x-3 md:space-y-0">
                <Button className="bg-lime-500 pr-2" onClick={handleExport}>
                  {showLoadingForDownloadExcel}
                  Export Audits
                </Button>
                </div>
              </div>
            </div>
          </div>
        </section>               
        <div id="searchData">        
      </div>
      {/* Audit Table */}
      <div className="relative overflow-auto shadow-md sm:rounded-lg">
        <Table>
          <TableHead className='sticky border bg-gray-400 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
            <TableHeadCell>Action</TableHeadCell>
            <TableHeadCell className='px-6 py-3'><div className='flex items-center'> User Type <div className='pl-2'>{sortingButtonForUserType}</div> </div></TableHeadCell>
            <TableHeadCell>User ID</TableHeadCell>
            <TableHeadCell className='px-6 py-3'><div className='flex items-center'> Event <div className='pl-2'>{sortingButtonForEvent}</div> </div></TableHeadCell>
            <TableHeadCell className='px-6 py-3'><div className='flex items-center'> Auditable Type <div className='pl-2'>{sortingButtonForAuditableType}</div> </div></TableHeadCell>
            <TableHeadCell>Auditable ID</TableHeadCell>
            <TableHeadCell>Old Values</TableHeadCell>
            <TableHeadCell>New Values</TableHeadCell>
            <TableHeadCell>URL</TableHeadCell>
            <TableHeadCell>IP Address</TableHeadCell>
            <TableHeadCell>User Agent</TableHeadCell>
            <TableHeadCell>Tags</TableHeadCell>
            <TableHeadCell>Created At</TableHeadCell>
            <TableHeadCell>Modified At</TableHeadCell>
          </TableHead>
          <TableBody className="divide-y overflow-auto">
            {audits.length === 0 ? (
              <TableRow>
                <TableCell colSpan={14} className="py-4 text-center text-gray-500">
                  Data Not Found
                </TableCell>
              </TableRow>
            ) : (
              audits.map((audit, index) => (
                <TableRow
                  key={`${audit.user_id || index}-${audit.auditable_id || index}`}
                  className="bg-white text-gray-900 hover:bg-gray-200 dark:border-gray-700 dark:bg-slate-500 dark:text-white dark:hover:bg-slate-300 dark:hover:text-gray-900"
                >
                  <TableCell>
                    <button
                      onClick={() => handleDetailClick(audit.id)}
                      className="flex items-center space-x-2 rounded bg-blue-500 px-2 py-1 text-white hover:bg-blue-600"
                    >
                      <FiEye size={18} />
                      <span>Detail</span>
                    </button>
                  </TableCell>
                  <TableCell className="whitespace-nowrap font-medium">
                    {audit.user_type || 'N/A'}
                  </TableCell>
                  <TableCell>{audit.user_id || 'N/A'}</TableCell>
                  <TableCell>{audit.event || 'N/A'}</TableCell>
                  <TableCell>{audit.auditable_type || 'N/A'}</TableCell>
                  <TableCell>{audit.auditable_id}</TableCell>
                  <TableCell>{audit.old_values ? JSON.stringify(audit.old_values) : 'N/A'}</TableCell>
                  <TableCell>{audit.new_values ? JSON.stringify(audit.new_values) : 'N/A'}</TableCell>
                  <TableCell>{audit.url || 'N/A'}</TableCell>
                  <TableCell>{audit.ip_address || 'N/A'}</TableCell>
                  <TableCell>{audit.user_agent || 'N/A'}</TableCell>
                  <TableCell>{audit.tags || 'N/A'}</TableCell>
                  <TableCell>
                    {audit.created_at ? new Date(audit.created_at).toLocaleString() : 'N/A'}
                  </TableCell>
                  <TableCell>
                    {audit.updated_at ? new Date(audit.updated_at).toLocaleString() : 'N/A'}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>        
      </div>
      
      <div className="mt-4 flex items-center justify-center">
        {/* Page Size Selector */}
        <div className="contents pr-4">
          <label htmlFor="page-size" className="mr-2">
            Items per page:
          </label>
          <Select
            id="page-size"
            className="p-2"
            value={pageSize}
            onChange={handlePageSizeChange}
          >
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </Select>
        </div>
        <p className='p-2'>
          Showing {startIndex} to {endIndex} of {rows} Entries
        </p>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            className="rounded-l border border-gray-300 bg-gray-100 p-2 hover:bg-gray-200"
            disabled={currentPage === 1}
          >
            Previous
          </button>

          <div className="mx-2 flex space-x-2">{renderPageNumbers()}</div>

          <button
            onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
            className="rounded-r border border-gray-300 bg-gray-100 p-2 hover:bg-gray-200"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>

    </div>
  );
};

export default AuditList;
