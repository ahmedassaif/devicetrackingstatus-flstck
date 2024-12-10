export interface Audit {
    id: number;
    auditable_type: string; // The type of the related model (e.g., "App\\Models\\User")
    auditable_id: number;   // The ID of the related model
    event: string;          // The action performed (e.g., "created", "updated")
    old_values: Record<string, any> | null; // Previous values as a key-value map
    new_values: Record<string, any> | null; // New values as a key-value map
    url: string | null;     // The URL where the action occurred
    ip_address: string | null; // IP address of the user performing the action
    user_agent: string | null; // User agent of the requester
    tags: string | null;    // Custom tags for categorizing the audit
    created_at: string;     // Timestamp of creation (ISO string)
    updated_at: string;     // Timestamp of last update (ISO string)
}

export interface PaginationMeta {
    current_page: number;   // Current page number
    last_page: number;      // Last available page number
    total: number;          // Total number of records
}

export interface PaginatedResponse<T> {
    data: T[];              // Array of records
    meta: PaginationMeta;   // Pagination metadata
}