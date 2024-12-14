import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ResponseResult } from '../../services/Responses/ResponseResult';
import { GetAuditsAudit } from '../../services/Audits/Requests/GetAuditsAudit';
import AuditService from '../../services/Audits/AuditService';
import { prettifyJson } from '../../Extensions/StringExtensions';
import { useNavigate } from 'react-router-dom';

const AuditDetail: React.FC = () => {
  const { auditId } = useParams();
  const [audit, setAudit] = useState<GetAuditsAudit | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuditDetail = async () => {
      setLoading(true);
      setError(null);

      if (!auditId) {
        setError('Audit ID is missing!');
        return;
      }
      
      try {
        
        const auditService = new AuditService();
        const response: ResponseResult<GetAuditsAudit> = await auditService.getAudit(Number(auditId));
        if (response.result) {
          setAudit(response.result);
        } else {
          setError(response.error?.detail || 'Failed to fetch audit details.');
        }
      } catch (err: any) {
        setError(err.message || 'An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchAuditDetail();
  }, [auditId]);

  if (loading) return <p>Loading audit details...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;
  if (!audit) return <p>No audit details available.</p>;

  const getDateLabel = () => {
    if (audit.event.trim().toLowerCase().includes('create')) {
      return audit.created_at
        ? new Date(audit.created_at).toLocaleString()
        : 'N/A';
    } else if (audit.event.trim().toLowerCase().includes('update')) {
      return audit.updated_at
        ? new Date(audit.updated_at).toLocaleString()
        : 'N/A';
    }
    return 'N/A';
  };

    function handleBackClick(): void {
        navigate(`/Audits`); 
    }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">{`${audit.event} ${audit.auditable_type}`}</h1>
        <p className="text-gray-600">
          On {getDateLabel()}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded bg-gray-100 p-4 shadow">
          <h2 className="font-bold">Table Name</h2>
          <p>{audit.auditable_type || 'N/A'}</p>
        </div>
        <div className="rounded bg-gray-100 p-4 shadow">
          <h2 className="font-bold">Entity ID</h2>
          <p>{audit.auditable_id || 'N/A'}</p>
        </div>
        <div className="rounded bg-gray-100 p-4 shadow">
          <h2 className="font-bold">Action Name</h2>
          <p>{audit.event || 'N/A'}</p>
        </div>
        <div className="rounded bg-gray-100 p-4 shadow">
          <h2 className="font-bold">Client Application ID</h2>
          <p>{audit.user_id || 'N/A'}</p>
        </div>
        <div className="rounded bg-gray-100 p-4 shadow">
          <h2 className="font-bold">From IP Address</h2>
          <p>{audit.ip_address || 'N/A'}</p>
        </div>
        <div className="rounded bg-gray-100 p-4 shadow">
          <h2 className="font-bold">Old Values</h2>
          <pre className="whitespace-pre-wrap font-mono">
          {audit.old_values ? prettifyJson(JSON.stringify(audit.old_values)) : 'N/A'}
          </pre>
        </div>
        <div className="rounded bg-gray-100 p-4 shadow">
          <h2 className="font-bold">New Values</h2>
          <pre className="whitespace-pre-wrap font-mono">
          {audit.new_values ? prettifyJson(JSON.stringify(audit.new_values)) : 'N/A'}
          </pre>
        </div>
      </div>
      <div>
      <button
        type="button" 
        onClick={() => handleBackClick()}
        className="mb-2 me-2 rounded-lg border border-gray-800 px-5 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-gray-300 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-800"
      >Back</button>
      </div>
    </div>
  );
};

export default AuditDetail;
