import React, { useCallback, useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, TextInput } from 'flowbite-react'; // Flowbite Pagination component
import { GetAuditsRequest } from '../../services/Audits/Requests/GetAuditsRequest';
import { GetAuditsAudit } from '../../services/Audits/Requests/GetAuditsAudit';
import { ResponseResult } from '../../services/Responses/ResponseResult';
import { PaginatedListResponse } from '../../services/Responses/PaginatedListResponse';
import AuditService from '../../services/Audits/AuditService';
import { toTableData } from '../../services/utils/PaginatedListResponseExtensions';
import axios, { CancelTokenSource } from 'axios';
import { FiEye, FiSearch } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';

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
  const [notification, setNotification] = useState<string | null>(null);

  const navigate = useNavigate();

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
        sortField: undefined,
        sortOrder: undefined,
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
  }, [currentPage, handleAuditResponse, pageSize, keyword]);
  

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
  };

  if (loading) {
    return <p>Loading audits...</p>;
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
  };

  const handleDetailClick = (auditId: number) => {
    navigate(`/Audits/Details/${auditId}`);  // Navigate to the detail page
  };
  

  return (
      <div className="container mx-auto">
        <h1 className="mb-4 text-2xl font-bold">Audit List</h1>               
        <div id="searchData">        
        <div className="flex items-center justify-end pb-2">
          {/* <Button color="blue">
            <FaPlus />
            </Button> */}
          {/* Hidden file input */}
          <form onSubmit={searchData} className="flex items-center space-x-1">
            <TextInput
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Find something here..."
              className='pr-2'
            />

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
      </div>
      {/* Audit Table */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <Table>
          <TableHead className='sticky border bg-gray-400 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
            <TableHeadCell>Action</TableHeadCell>
            <TableHeadCell>User Type</TableHeadCell>
            <TableHeadCell>User ID</TableHeadCell>
            <TableHeadCell>Event</TableHeadCell>
            <TableHeadCell>Auditable Type</TableHeadCell>
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
          <TableBody className="h-80 divide-y overflow-y-auto">
            {audits.map((audit, index) => (
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
            ))}
          </TableBody>
        </Table>        
      </div>
      
      <div className="mt-4 flex items-center justify-center">
        {/* Page Size Selector */}
        <div className="pr-4">
          <label htmlFor="page-size" className="mr-2">
            Items per page:
          </label>
          <select
            id="page-size"
            className="rounded bg-gray-200 p-2"
            value={pageSize}
            onChange={handlePageSizeChange}
          >
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>
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
