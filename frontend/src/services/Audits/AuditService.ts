import { ApiEndpoint } from './ApiEndpoint';
import { ResponseResult } from '../Responses/ResponseResult';
import { PaginatedListResponse } from '../Responses/PaginatedListResponse';
import { GetAuditsAudit } from './Requests/GetAuditsAudit';
import { GetAuditsRequest } from './Requests/GetAuditsRequest';
import api from '../../api';  // Import the api instance from api.ts

// Import the utility functions
import { AddQueryParameters } from '../utils/AddQueryParameters';
// import { ToResponseResult } from '../utils/ToResponseResult';
 import { toResponseResult } from '../utils/RestResponseExtensions';
import { HandleError } from '../utils/HandleError';

class AuditService {
  // private apiClient: AxiosInstance;

  // constructor(optionsApi: BackEndOptions) {
  //   this.apiClient = axios.create({
  //     baseURL: `${options.baseUrl}/${ApiEndpoint.V1.Audits.Segment}`,
  //     timeout: 5000,
  //   });
  // }

  // This method uses the apiClient instead of the global api
  // public async getAudits(request: GetAuditsRequest): Promise<ResponseResult<PaginatedListResponse<GetAuditsAudit>>> {
  //   try {
  //     const response = await api.get(ApiEndpoint.V1.Audits.Segment, { params: request });
  //     return response.data;
  //   } catch (error: unknown) {
  //     // Check if the error is an instance of AxiosError
  //     if (axios.isAxiosError(error)) {
  //       // Now TypeScript knows `error` has a `response` property
  //       throw new Error(error.response?.data?.detail || 'Error fetching audits');
  //     } else {
  //       // Handle other types of errors (e.g., network issues, unexpected errors)
  //       throw new Error('An unexpected error occurred');
  //     }
  //   }
  // }

  // async getAudits(request: GetAuditsRequest): Promise<ResponseResult<PaginatedListResponse<GetAuditsAudit>>> {
  //   const queryParams = addQueryParameters(request);

  //   try {
  //     const response = await this.apiClient.get<PaginatedListResponse<GetAuditsAudit>>(`?${queryParams}`);
  //     return toResponseResult<PaginatedListResponse<GetAuditsAudit>>(response);
  //   } catch (error: any) {
  //     return {
  //       error: {
  //         type: 'NetworkError',
  //         title: 'Network Error',
  //         status: error.response?.status || 0,
  //         detail: error.message,
  //       },
  //     };
  //   }
  // }

  // public async getAudits(request: GetAuditsRequest): Promise<ResponseResult<PaginatedListResponse<GetAuditsAudit>>> {
  //   const queryParams = AddQueryParameters(request);

  //   try {
  //     const response = await api.get(`${ApiEndpoint.V1.Audits.Segment}?${queryParams}`);
  //     console.log('Making API call to:', `${ApiEndpoint.V1.Audits.Segment}?${queryParams}`);
  //     console.log('Request query parameters:', queryParams);
  //     console.log('Raw API response:', response);
  //     console.log('Raw response data:', response.data);
  //     // Return the response data after processing it into ResponseResult format
  //     const outputAPI = ToResponseResult<PaginatedListResponse<GetAuditsAudit>>(response.data);
  //     console.log('Final result of getAudits in AuditService: ', outputAPI);
  //     return outputAPI;
  //   } catch (error: any) {
  //     // Handle errors based on Axios response
  //     return HandleError<PaginatedListResponse<GetAuditsAudit>>(error);
  //   }
  // }

  public async getAudits(
    request: GetAuditsRequest
  ): Promise<ResponseResult<PaginatedListResponse<GetAuditsAudit>>> {
    const queryParams = AddQueryParameters(request);

    try {
      const response = await api.get(`${ApiEndpoint.V1.Audits.Segment}?${queryParams}`);
      console.log('Making API call to:', `${ApiEndpoint.V1.Audits.Segment}?${queryParams}`);
      console.log('Request query parameters:', queryParams);
      console.log('Raw API response:', response);
      console.log('Raw response data:', response.data);

      // Use the utility to process the response
      const outputAPI = toResponseResult<PaginatedListResponse<GetAuditsAudit>>(response);
      console.log('Final result of getAudits in AuditService: ', outputAPI);
      return outputAPI;
    } catch (error: any) {
      // Handle errors based on Axios response
      return HandleError<PaginatedListResponse<GetAuditsAudit>>(error);
    }
  }
}

export default AuditService;