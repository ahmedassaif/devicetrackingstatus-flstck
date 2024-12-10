export class AuditOptions {
    static SECTION_KEY = 'Audits';
  
    filterMinimumYear: number;
    filterMaximumYear: number;
  
    constructor() {
      // Replace these with real configuration values if needed
      this.filterMinimumYear = 2021; // Default minimum year
      this.filterMaximumYear = 2030; // Default maximum year
    }
  
    getFilterMinimumCreated(): Date {
      return new Date(`${this.filterMinimumYear}-01-01T00:00:00`);
    }
  
    getFilterMaximumCreated(): Date {
      return new Date(`${this.filterMaximumYear}-12-31T23:59:59`);
    }
  }  