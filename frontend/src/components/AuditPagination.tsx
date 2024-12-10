import React, { useEffect, useState } from 'react';
import { Table, Pagination, Spinner } from 'flowbite-react';
import { Audit } from '../types';

// Assuming getAudits is either imported or written as an async function here
const getAudits = async (page: number) => {
  try {
    const response = await fetch(`/api/audits?page=${page}`); // Example API call
    if (!response.ok) {
      throw new Error('Failed to fetch audits');
    }
    const data = await response.json();
    return {
      data: data.audits, // adjust according to your API response structure
      totalPages: data.totalPages, // adjust accordingly
    };
  } catch (err: any) {
    throw new Error(err.message || 'An error occurred while fetching audits.');
  }
};

const AuditPagination: React.FC = () => {
  const [audits, setAudits] = useState<Audit[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAudits = async () => {
      setLoading(true);
      try {
        const response = await getAudits(currentPage);
        setAudits(response.data);
        setTotalPages(response.totalPages);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch audits.');
      } finally {
        setLoading(false);
      }
    };
    fetchAudits();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-4">
        <Spinner aria-label="Loading audits..." />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Audit Logs</h1>
      <Table hoverable={true}>
        <Table.Head>
          <Table.HeadCell>Event</Table.HeadCell>
          <Table.HeadCell>Auditable Type</Table.HeadCell>
          <Table.HeadCell>Auditable ID</Table.HeadCell>
          <Table.HeadCell>Old Values</Table.HeadCell>
          <Table.HeadCell>New Values</Table.HeadCell>
          <Table.HeadCell>URL</Table.HeadCell>
          <Table.HeadCell>IP Address</Table.HeadCell>
          <Table.HeadCell>Timestamp</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {audits.map((audit) => (
            <Table.Row key={audit.id}>
              <Table.Cell>{audit.event}</Table.Cell>
              <Table.Cell>{audit.auditable_type}</Table.Cell>
              <Table.Cell>{audit.auditable_id}</Table.Cell>
              <Table.Cell>
                {audit.old_values ? JSON.stringify(audit.old_values) : 'N/A'}
              </Table.Cell>
              <Table.Cell>
                {audit.new_values ? JSON.stringify(audit.new_values) : 'N/A'}
              </Table.Cell>
              <Table.Cell>{audit.url || 'N/A'}</Table.Cell>
              <Table.Cell>{audit.ip_address || 'N/A'}</Table.Cell>
              <Table.Cell>{new Date(audit.created_at).toLocaleString()}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <Pagination
          currentPage={currentPage}
          layout="pagination"
          onPageChange={handlePageChange}
          showIcons={true}
          totalPages={totalPages}
          aria-label="Pagination for audit logs"
        />
      </div>
    </div>
  );
};

export default AuditPagination;
