import api from './api';

// Fetch all audits with pagination
export const fetchAudits = async (page = 1, pageSize = 15) => {
    // Send the page and page_size as query parameters
    return await api(`/audits?page=${page}&page_size=${pageSize}`);
};

// Fetch audit by ID
export const fetchAuditById = async (id) => {
    return await api(`/audits/${id}`);
};
