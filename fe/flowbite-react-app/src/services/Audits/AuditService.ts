import axios, { AxiosInstance } from 'axios';
import { addQueryParameters } from '../QueryParameters';
import { toResponseResult } from '../Responses/ResponseExtensions';
import { BackEndOptions } from '../BackEndOptions';
import { ApiEndpoint } from './ApiEndpoint';
import { ResponseResult } from '../Responses/ResponseResult';
import { PaginatedListResponse } from '../Responses/PaginatedListResponse';
import { GetAuditsAudit } from '../Audits/Requests/GetAuditsAudit';
import { GetAuditsRequest } from '../Audits/Requests/GetAuditsRequest';

class AuditService {
  private apiClient: AxiosInstance;

  constructor(options: BackEndOptions) {
    this.apiClient = axios.create({
      baseURL: `${options.baseUrl}/${ApiEndpoint.V1.Audits.Segment}`,
      timeout: 5000,
    });
  }

  async getAudits(request: GetAuditsRequest): Promise<ResponseResult<PaginatedListResponse<GetAuditsAudit>>> {
    const queryParams = addQueryParameters(request);

    try {
      const response = await this.apiClient.get<PaginatedListResponse<GetAuditsAudit>>(`?${queryParams}`);
      return toResponseResult<PaginatedListResponse<GetAuditsAudit>>(response);
    } catch (error: any) {
      return {
        error: {
          type: 'NetworkError',
          title: 'Network Error',
          status: error.response?.status || 0,
          detail: error.message,
        },
      };
    }
  }
}

export default AuditService;
