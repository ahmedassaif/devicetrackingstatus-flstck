export interface PaginatedListResponse<T> extends Response {
    items: T[];
    pageIndex: number;
    totalPages: number;
    totalCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
} 

interface Response {
    timestamp: Date;
  }