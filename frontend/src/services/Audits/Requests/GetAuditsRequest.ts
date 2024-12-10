export class GetAuditsRequest {
    page: number | undefined;
    pageSize: number | undefined;
    searchText: string | undefined;
    sortField: string | undefined;
    sortOrder: 'asc' | 'desc' | undefined;
    from: Date | undefined;
    to: Date | undefined;
    // Allow additional properties (e.g., cancelToken)
    [key: string]: any;
  
    // public auditOptions: AuditOptions;
  
    constructor(page: number, pageSize: number, searchText: string, sortField: string, sortOrder: 'asc' | 'desc' , from: Date, to: Date/*, auditOptions: AuditOptions*/) {
      this.page = page;
      this.pageSize = pageSize;
      this.searchText = searchText;
      this.sortField = sortField;
      this.sortOrder = sortOrder;
      this.from = from;
      this.to = to;
    //   this.auditOptions = new AuditOptions();
    }
  
    // getAuditOptions(): AuditOptions {
    //   return this.auditOptions;
    // }

    // // Setter method for auditOptions
    // public setAuditOptions(auditOptions: AuditOptions) {
    //     this.auditOptions = auditOptions;
    // }
  
    // validate(): string[] {
    //   const errors: string[] = [];
  
    //   if (this.page !== undefined && (!Number.isInteger(this.page) || this.page < 1)) {
    //     errors.push('Page must be an integer greater than or equal to 1.');
    //   }
  
    //   if (
    //     this.pageSize !== undefined &&
    //     (!Number.isInteger(this.pageSize) || this.pageSize < 1 || this.pageSize > 100)
    //   ) {
    //     errors.push('PageSize must be an integer between 1 and 100.');
    //   }
  
    //   if (this.searchText && this.searchText.length > 255) {
    //     errors.push('SearchText must not exceed 255 characters.');
    //   }
  
    //   if (this.from && isNaN(this.from.getTime())) {
    //     errors.push('From must be a valid date.');
    //   }
  
    //   if (this.to && isNaN(this.to.getTime())) {
    //     errors.push('To must be a valid date.');
    //   }
  
    //   if (this.sortOrder && !['asc', 'desc'].includes(this.sortOrder)) {
    //     errors.push('SortOrder must be either "asc" or "desc".');
    //   }
  
    //   return errors;
    // }
  }
  