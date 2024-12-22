export class GetDataUnitsRequest {
    page: number | undefined;
    pageSize: number | undefined;
    searchText: string | undefined;
    sortField: string | undefined;
    sortOrder: string | undefined;
    from: Date | undefined;
    to: Date | undefined;
    [key: string]: any; // Allow additional properties (e.g., cancelToken)
  
    constructor(page: number, pageSize: number, searchText: string, sortField: string, sortOrder: 'asc' | 'desc' , from: Date, to: Date/*, DataUnitOptions: DataUnitOptions*/) {
      this.page = page;
      this.pageSize = pageSize;
      this.searchText = searchText;
      this.sortField = sortField;
      this.sortOrder = sortOrder;
      this.from = from;
      this.to = to;
    }
  }
  