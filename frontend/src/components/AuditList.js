import React, { useEffect, useState } from 'react';
import { fetchAudits } from '../services/AuditService';

const AuditList = () => {
    const [audits, setAudits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getAudits = async () => {
            try {
                const data = await fetchAudits();
                setAudits(data.data); // Assuming `data.data` contains the audits
            } catch (err) {
                setError(err.message || 'Failed to fetch audits.');
            } finally {
                setLoading(false);
            }
        };

        getAudits();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Audit List</h1>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Table Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Event
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Created At
                            </th>
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
        </div>
    );
};

export default AuditList;
