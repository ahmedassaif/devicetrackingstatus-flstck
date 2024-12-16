import { ApiEndpoint } from './Constants/ApiEndpoint';
import { ResponseResult } from '../Responses/ResponseResult';
import { PaginatedListResponse } from '../Responses/PaginatedListResponse';
import { GetAuditsAudit } from './Requests/GetAuditsAudit';
import { GetAuditsRequest } from './Requests/GetAuditsRequest';
import api from '../api';  // Import the api instance from api.ts
import { FileDownloadHelper } from  '../utils/FileDownloadHelper';

// Import the utility functions
import { AddQueryParameters } from '../utils/AddQueryParameters';
 import { toResponseResult } from '../utils/RestResponseExtensions';
import { HandleError } from '../utils/HandleError';
import { log } from 'console';

class AuditService {

  public async getAudits(
    request: GetAuditsRequest
  ): Promise<ResponseResult<PaginatedListResponse<GetAuditsAudit>>> {
    const queryParams = AddQueryParameters(request);

    try {
      const response = await api.get(`${ApiEndpoint.V1.Audits.Segment}?${queryParams}`);

      // Use the utility to process the response
      const outputAPI = toResponseResult<PaginatedListResponse<GetAuditsAudit>>(response);
      return outputAPI;

    } catch (error: any) {
      // Handle errors based on Axios response
      return HandleError<PaginatedListResponse<GetAuditsAudit>>(error);
    }
  }

  public async getAudit(id: number): Promise<ResponseResult<GetAuditsAudit>> {

    try {
      
      const response = await api.get(`${ApiEndpoint.V1.Audit.Segment}/${id}`);

      return toResponseResult<GetAuditsAudit>(response);

    } catch (error) {
      return HandleError<GetAuditsAudit>(error);
    }
  }

  public async exportAuditsToExcel(): Promise<void> {
    try {
      
      const response = await api.get(`${ApiEndpoint.V1.ExportToExcel.Segment}`, { responseType: 'blob', });
      
      FileDownloadHelper.downloadExcelFile(response);

    } catch (error) {
      console.error('Error exporting audits', error); 
      throw error;
    }
  }

}

export default AuditService;