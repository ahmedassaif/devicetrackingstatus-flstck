import React, { useCallback, useEffect, useState } from 'react';
import { Spinner, Select, Button, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, TextInput } from 'flowbite-react'; // Flowbite component
import { GetDataUnitsRequest } from '../../../services/DataUnits/Requests/GetDataUnitsRequest';
import { GetDataUnitsDataUnit } from '../../../services/DataUnits/Requests/GetDataUnitsDataUnit';
import { ResponseResult } from '../../../services/Responses/ResponseResult';
import { PaginatedListResponse } from '../../../services/Responses/PaginatedListResponse';
import DataUnitService from '../../../services/DataUnits/DataUnitService';
import { toTableData } from '../../../services/utils/PaginatedListResponseExtensions';
import axios, { CancelTokenSource } from 'axios';
import { FiEye, FiSearch } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import { FaFileExcel, FaPencilAlt, FaSort, FaSortAlphaDown, FaSortAlphaUp, FaTrash } from 'react-icons/fa'
import { IoMdCloseCircle } from "react-icons/io";
import { Console } from 'console';
import { SuccessResponse } from '../../../services/Responses/SuccessResponse';

const DataUnitList: React.FC = () => {

  const [DataUnits, setDataUnits] = useState<GetDataUnitsDataUnit[]>([]);
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
  const [sortingButtonForNameUnit, setSortingButtonForNameUnit] = useState<JSX.Element>(<FaSort className='cursor-pointer' onClick={(e) => getSortFromField("NameUnit", "asc", e)} />);
  const [sortingButtonForPlan, setSortingButtonForPlan] = useState<JSX.Element>(<FaSort className='cursor-pointer' onClick={(e) => getSortFromField("Plan", "asc", e)} />);


  function getSortFromField(nameField: string, sortOrderBy: string, e: { preventDefault: () => void }){
    
    e.preventDefault();

    if (nameField && sortOrderBy) {
      if (nameField === "Plan") {
        if (sortOrderBy === 'asc') {
          setSortingButtonForPlan(<FaSortAlphaUp className='cursor-pointer' onClick={(e) => getSortFromField("Plan", "desc", e)} />);      
        }
        else if (sortOrderBy === 'desc') {
          setSortingButtonForPlan(<FaSortAlphaDown className='cursor-pointer' onClick={(e) => getSortFromField("", "", e)} />);
        }
        setSortingButtonForNameUnit(<FaSort className='cursor-pointer' onClick={(e) => getSortFromField("NameUnit", "asc", e)} />);
      }
      else if (nameField === 'NameUnit') {
        if (sortOrderBy === 'asc') {
          setSortingButtonForNameUnit(<FaSortAlphaUp className='cursor-pointer' onClick={(e) => getSortFromField("NameUnit", "desc", e)} />);
        }
        else if (sortOrderBy === 'desc') {
          setSortingButtonForNameUnit(<FaSortAlphaDown className='cursor-pointer' onClick={(e) => getSortFromField("", "", e)} />);
        }

        setSortingButtonForPlan(<FaSort className='cursor-pointer' onClick={(e) => getSortFromField("Plan", "asc", e)} />);
      }

      setSortDirection(sortOrderBy);
      setSortField(nameField);
      
    }
    else{
      setSortingButtonForPlan(<FaSort className='cursor-pointer' onClick={(e) => getSortFromField("Plan", "asc", e)} />);
      setSortingButtonForNameUnit(<FaSort className='cursor-pointer' onClick={(e) => getSortFromField("NameUnit", "asc", e)} />);
      setSortDirection("");
      setSortField("");
    }

    setCurrentPage(1);
  }

  // Memoize handleDataUnitResponse to avoid unnecessary re-renders
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

  useEffect(() => {
    const source: CancelTokenSource = axios.CancelToken.source();
  
    const fetchDataUnits = async () => {
      setLoading(true);
      setError(null); // Reset previous errors on new fetch
            
      const request: GetDataUnitsRequest = {
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
        const dataUnitService = new DataUnitService();
        const response: ResponseResult<PaginatedListResponse<GetDataUnitsDataUnit>> = await dataUnitService.getDataUnits({
          ...request,
          cancelToken: source.token, // Add cancel token to the request
        });

        handleDataUnitResponse(response); // Call the improved function

      } catch (err: any) {
        setError(err.message || 'An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    };
    
  
    fetchDataUnits();
  
    return () => source.cancel('Request canceled by the user.');
  }, [currentPage, handleDataUnitResponse, pageSize, keyword, sortField, sortDirection]);
  

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

    setSortingButtonForPlan(<FaSort className='cursor-pointer' onClick={(e) => getSortFromField("Plan", "asc", e)} />);
    setSortingButtonForNameUnit(<FaSort className='cursor-pointer' onClick={(e) => getSortFromField("NameUnit", "asc", e)} />);
  };

  if (loading) {
    return (
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
        <img src="/images/beams.jpg" alt="" className="absolute left-1/2 top-1/2 max-w-none -translate-x-1/2 -translate-y-1/2" width="1308" />
        <div className="relative px-6 pb-8 pt-10 shadow-xl sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
          <div className="mx-auto max-w-md">
            <Button>
              <Spinner size="sm" />
              <span className="pl-3">Loading...</span>
            </Button>
          </div>
        </div>
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

    setSortingButtonForPlan(<FaSort className='cursor-pointer' onClick={(e) => getSortFromField("Plan", "asc", e)} />);
    setSortingButtonForNameUnit(<FaSort className='cursor-pointer' onClick={(e) => getSortFromField("NameUnit", "asc", e)} />);
  };

  const handleClickToEdit = (DataUnitId: string) => {
    navigate(`/DataUnit/Form/${DataUnitId}`);  // Navigate to the detail page
  };

  const handleClickToDelete = async (DataUnitId: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        const dataUnitService = new DataUnitService();
        const response:ResponseResult<SuccessResponse> = await dataUnitService.deleteDataUnit(DataUnitId);

        if (response.result) {
          setCurrentPage(1); // Reset to the first page
        }
      } catch (error) {
        console.error('Failed to delete DataUnit', error);
      }
    }
  }
  
  const handleExport = async () => {
    
    setLoadingDownloadFile(true);
    
    try {
      const dataUnitService = new DataUnitService(); 
      await dataUnitService.exportDataUnitsToExcel(); 
    } 
    catch (error) 
    { 
      console.error('Failed to export DataUnits', error); 
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

      setSortingButtonForPlan(<FaSort className='cursor-pointer' onClick={(e) => getSortFromField("Plan", "asc", e)} />);
      setSortingButtonForNameUnit(<FaSort className='cursor-pointer' onClick={(e) => getSortFromField("NameUnit", "asc", e)} />);
    } else {
      // If no search has been performed, just clear the input
      setQuery('');
    }
  };

  return (
    <div className="container mx-auto h-full">
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
                  Export Lokasi Kerja
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DataUnit Table */}
      <div className="container mx-auto overflow-x-auto">
        <div className="w-full max-w-full">
          <Table className="w-full min-w-full max-w-full shadow-md sm:rounded-lg">
            <TableHead className="sticky border bg-gray-400 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
              <TableHeadCell>Action</TableHeadCell>
              <TableHeadCell className="px-6 py-3">
                <div className="flex items-center">
                  Lokasi Kerja
                  <div className="pl-2">{sortingButtonForNameUnit}</div>
                </div>
              </TableHeadCell>
              <TableHeadCell className="px-6 py-3">
                <div className="flex items-center">
                  Kode Plan
                  <div className="pl-2">{sortingButtonForPlan}</div>
                </div>
              </TableHeadCell>
            </TableHead>
            <TableBody className="divide-y overflow-auto border-2">
              {DataUnits.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={14} className="py-4 text-center text-gray-500">
                    Data Not Found
                  </TableCell>
                </TableRow>
              ) : (
                DataUnits.map((DataUnit, index) => (
                  <TableRow
                    key={`${index}`}
                    className="bg-white text-gray-900 hover:bg-gray-200 dark:border-gray-700 dark:bg-slate-500 dark:text-white dark:hover:bg-slate-300 dark:hover:text-gray-900"
                  >
                    <TableCell>
                      <Button
                        onClick={() => handleClickToEdit(DataUnit.id)}
                        className="flex items-center space-x-2 rounded bg-blue-500 px-2 py-1 text-white hover:bg-blue-600"
                        aria-label="Edit"
                      >
                        <FaPencilAlt size={18} />
                      </Button>
                      <Button
                        onClick={() => handleClickToDelete(DataUnit.id)}
                        className="flex items-center space-x-2 rounded bg-red-500 px-2 py-1 text-white hover:bg-blue-600"
                        aria-label="Delete"
                      >
                        <FaTrash size={18} />
                      </Button>
                    </TableCell>
                    <TableCell className="whitespace-nowrap font-medium">
                      {DataUnit.NameUnit}
                    </TableCell>
                    <TableCell>{DataUnit.Plan || 'N/A'}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center">
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
        <p className="p-2">
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

export default DataUnitList;
