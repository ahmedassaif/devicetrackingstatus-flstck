import api from './api';

// Fetch all audits
export const fetchAudits = async () => {
    return await api('/audits');
};

// Fetch audit by ID
export const fetchAuditById = async (id) => {
    return await api(`/audits/${id}`);
};
