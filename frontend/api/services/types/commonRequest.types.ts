/* eslint-disable @typescript-eslint/no-explicit-any */
export class PaginatedListRequest {
  page: number | undefined;
  pageSize: number | undefined;
  searchText: string | undefined;
  sortField: string | undefined;
  sortOrder: string | undefined;
  from: string | undefined;
  to: string | undefined;
  [key: string]: any;

  constructor(
    page: number,
    pageSize: number,
    searchText: string,
    sortField: string,
    sortOrder: "asc" | "desc",
    from: string,
    to: string,
  ) {
    this.page = page;
    this.pageSize = pageSize;
    this.searchText = searchText;
    this.sortField = sortField;
    this.sortOrder = sortOrder;
    this.from = from;
    this.to = to;
  }
}
