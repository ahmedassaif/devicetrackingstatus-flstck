export interface GetAuditsRequest {
    searchKeyword?: string;
    from?: string; // ISO Date
    to?: string;   // ISO Date
    pageIndex?: number;
    pageSize?: number;
}