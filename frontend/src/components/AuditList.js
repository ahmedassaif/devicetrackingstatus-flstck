import React, { useEffect, useState } from 'react';
import { fetchAudits } from '../services/AuditService';
import { Pagination } from 'flowbite-react'; // Import Flowbite Pagination component

const AuditList = () => {
    const [audits, setAudits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageSize, setPageSize] = useState(15);

    // Fetch audits data with pagination
    useEffect(() => {
        const getAudits = async () => {
            try {
                const response = await fetchAudits(currentPage, pageSize);
                setAudits(response.data); // Assuming `response.data` contains the audits
                setTotalPages(response.total_pages); // Assuming response includes total_pages
            } catch (err) {
                setError(err.message || 'Failed to fetch audits.');
            } finally {
                setLoading(false);
            }
        };

        getAudits();
    }, [currentPage, pageSize]);

    // Handle page change
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Handle page size change (if you want to make it dynamic)
    const handlePageSizeChange = (event) => {
        setPageSize(event.target.value);
        setCurrentPage(1); // Reset to first page when page size changes
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Audit List</h1>
            
            {/* Page Size Selector */}
            <div className="mb-4">
                <label htmlFor="page-size" className="mr-2">Items per page:</label>
                <select
                    id="page-size"
                    className="bg-gray-200 p-2 rounded"
                    value={pageSize}
                    onChange={handlePageSizeChange}
                >
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                    <option value={20}>20</option>
                </select>
            </div>
            
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">ID</th>
                            <th scope="col" className="px-6 py-3">Table Name</th>
                            <th scope="col" className="px-6 py-3">Event</th>
                            <th scope="col" className="px-6 py-3">Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {audits.map((audit) => (
                            <tr
                                key={audit.id}
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                            >
                                <td className="px-6 py-4">{audit.id}</td>
                                <td className="px-6 py-4">{audit.table_name}</td>
                                <td className="px-6 py-4">{audit.event}</td>
                                <td className="px-6 py-4">{new Date(audit.created_at).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Component */}
            <div className="mt-4">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    showIcons={true}
                    className="flex justify-center"
                />
            </div>
        </div>
    );
};

export default AuditList;
