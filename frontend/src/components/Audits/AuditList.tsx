import React, { useCallback, useEffect, useState } from 'react';
import { Pagination, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react'; // Flowbite Pagination component
import { GetAuditsRequest } from '../../services/Audits/Requests/GetAuditsRequest';
import { GetAuditsAudit } from '../../services/Audits/Requests/GetAuditsAudit';
import { ResponseResult } from '../../services/Responses/ResponseResult';
import { PaginatedListResponse } from '../../services/Responses/PaginatedListResponse';
import AuditService from '../../services/Audits/AuditService';
import { toTableData } from '../../services/utils/PaginatedListResponseExtensions';
import axios, { CancelTokenSource } from 'axios';

const AuditList: React.FC = () => {
  console.log('AuditList component rendering');

  const [audits, setAudits] = useState<GetAuditsAudit[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [rows, setRows] = useState<number>(10);

  // Memoize handleAuditResponse to avoid unnecessary re-renders
  const handleAuditResponse = useCallback(
    (response: ResponseResult<PaginatedListResponse<GetAuditsAudit>>) => {
      console.log('Handling API response:', response);
    
      if (response.error) {
        console.error('API returned an error:', response.error);
        setError(response.error.detail || 'Failed to fetch audits.');
        setAudits([]); // Clear audits on error
        setTotalPages(1); // Reset total pages to default
        return;
      }
    
      if (response.result) {
        const tableData = toTableData(response.result); // Convert response using toTableData
    
        if (tableData.items.length > 0) {
          console.log('Fetched audits:', tableData.items);
          setAudits(tableData.items); // Update audits with fetched data
        } else {
          console.warn('API returned no data:', response.result);
          setAudits([]); // Clear audits when no data is returned
        }  
        setRows(tableData.totalItems);
        setTotalPages(Math.ceil(tableData.totalItems / pageSize)); // Update total pages
      } else {
        console.warn('API returned an unexpected response format:', response);
        setError('Unexpected API response format.');
        setAudits([]); // Clear audits on unexpected response
        setTotalPages(1); // Reset total pages to default
      }
    },
    [pageSize] // Add pageSize in dependency array to ensure it triggers when pageSize changes
  );  

  useEffect(() => {
    const source: CancelTokenSource = axios.CancelToken.source();
  
    const fetchAudits = async () => {
      console.log('fetchAudits function started');
      setLoading(true);
      setError(null); // Reset previous errors on new fetch
    
      const request: GetAuditsRequest = {
        page: currentPage,
        pageSize: pageSize,
        searchText: undefined,
        sortField: undefined,
        sortOrder: undefined,
        from: undefined,
        to: undefined,
        cancelToken: source.token, // Add cancel token directly
      };
    
      console.log('Request payload:', request);
    
      try {
        const auditService = new AuditService();
        console.log('Making API call');
        const response: ResponseResult<PaginatedListResponse<GetAuditsAudit>> = await auditService.getAudits({
          ...request,
          cancelToken: source.token, // Add cancel token to the request
        });
        console.log('API call successful, response:', response);
        handleAuditResponse(response); // Call the improved function
      } catch (err: any) {
        console.error('Error occurred during API call:', err);
        setError(err.message || 'An unexpected error occurred.');
      } finally {
        console.log('API call complete, setting loading to false');
        setLoading(false);
      }
    };
    
  
    fetchAudits();
  
    return () => source.cancel('Request canceled by the user.');
  }, [currentPage, handleAuditResponse, pageSize]);
  

  // Handle page change
  const handlePageChange = (page: number) => {
    console.log('Page change triggered: new page =', page);
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  };

  // Handle page size change
  const handlePageSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newPageSize = parseInt(event.target.value, 10);
    console.log('Page size change triggered: new pageSize =', newPageSize);
    setPageSize(newPageSize);
    setCurrentPage(1); // Reset to first page when page size changes
  };

  if (loading) {
    console.log('Loading state active, rendering loading message');
    return <p>Loading audits...</p>;
  }

  if (error) {
    console.error('Error state active, rendering error message:', error);
    return <p className="text-red-600">Error: {error}</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Audit List</h1>

      {/* Page Size Selector */}
      <div className="mb-4">
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

      {/* Audit Table */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <Table striped>
          <TableHead className='sticky bg-gray-100 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
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
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
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
      <p>Total Rows: {rows}, Page {currentPage} of {totalPages}</p>
      {/* Pagination Component */}
      <div className="mt-4 flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          showIcons={true}
        />
      </div>
    </div>
  );
};

export default AuditList;
