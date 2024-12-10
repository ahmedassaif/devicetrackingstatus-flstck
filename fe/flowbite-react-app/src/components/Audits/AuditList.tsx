import React, { useCallback, useEffect, useState } from 'react';
import { Pagination } from 'flowbite-react'; // Flowbite Pagination component
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
        <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">User Type</th>
              <th scope="col" className="px-6 py-3">User ID</th>
              <th scope="col" className="px-6 py-3">Event</th>
              <th scope="col" className="px-6 py-3">Auditable Type</th>
              <th scope="col" className="px-6 py-3">Auditable ID</th>
              <th scope="col" className="px-6 py-3">Old Values</th>
              <th scope="col" className="px-6 py-3">New Values</th>
              <th scope="col" className="px-6 py-3">URL</th>
              <th scope="col" className="px-6 py-3">IP Address</th>
              <th scope="col" className="px-6 py-3">User Agent</th>
              <th scope="col" className="px-6 py-3">Tags</th>
              <th scope="col" className="px-6 py-3">Created At</th>
              <th scope="col" className="px-6 py-3">Modified At</th>
            </tr>
          </thead>
          <tbody>
            {audits.map((audit, index) => {
              console.log(audit); // This will show the full data for each audit
              return (
                <tr key={`${audit.user_id || index}-${audit.auditable_id || index}`} className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                <td className="px-6 py-4">{audit.user_type || 'N/A'}</td>
                <td className="px-6 py-4">{audit.user_id || 'N/A'}</td>
                <td className="px-6 py-4">{audit.event || 'N/A'}</td>
                <td className="px-6 py-4">{audit.auditable_type || 'N/A'}</td>
                <td className="px-6 py-4">{audit.auditable_id}</td>
                <td className="px-6 py-4">{audit.old_values ? JSON.stringify(audit.old_values) : 'N/A'}</td>
                <td className="px-6 py-4">{audit.new_values ? JSON.stringify(audit.new_values) : 'N/A'}</td>
                <td className="px-6 py-4">{audit.url || 'N/A'}</td>
                <td className="px-6 py-4">{audit.ip_address || 'N/A'}</td>
                <td className="px-6 py-4">{audit.user_agent || 'N/A'}</td>
                <td className="px-6 py-4">{audit.tags || 'N/A'}</td>
                <td className="px-6 py-4">
                  {audit.created_at ? new Date(audit.created_at).toLocaleString() : 'N/A'}
                </td>
                <td className="px-6 py-4">
                  {audit.updated_at ? new Date(audit.updated_at).toLocaleString() : 'N/A'}
                </td>
              </tr>
              );
            })}
            {/* {audits.map((audit, index) => (
              <tr key={`${audit.userId || index}-${audit.auditableId || index}`} className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                <td className="px-6 py-4">{audit.userType || 'N/A'}</td>
                <td className="px-6 py-4">{audit.userId || 'N/A'}</td>
                <td className="px-6 py-4">{audit.event || 'N/A'}</td>
                <td className="px-6 py-4">{audit.auditableType || 'N/A'}</td>
                <td className="px-6 py-4">{audit.auditableId}</td>
                <td className="px-6 py-4">{audit.oldValues ? JSON.stringify(audit.oldValues) : 'N/A'}</td>
                <td className="px-6 py-4">{audit.newValues ? JSON.stringify(audit.newValues) : 'N/A'}</td>
                <td className="px-6 py-4">{audit.url || 'N/A'}</td>
                <td className="px-6 py-4">{audit.ipAddress || 'N/A'}</td>
                <td className="px-6 py-4">{audit.userAgent || 'N/A'}</td>
                <td className="px-6 py-4">{audit.tags || 'N/A'}</td>
                <td className="px-6 py-4">
                  {audit.createdAt ? new Date(audit.createdAt).toLocaleString() : 'N/A'}
                </td>
              </tr>
            ))} */}
          </tbody>
        </table>
      </div>

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
