import { BaseApiService } from "../base-api";
import { ApiEndpoint, GetAuditsAudit } from "../types/audit.types";
import { PaginatedListRequest } from "../types/commonRequest.types";
import { 
  ListResponse,
  PaginatedListResponse,
  ResponseResult,
  toResponseResult,
} from "../types/commonResponses.types";

import { FileDownloadHelper } from "@/api/utils/FileDownloadHelper";
import { AddQueryParameters } from "@/api/utils/AddQueryParameters";
import { AxiosResponse } from "axios";

export class AuditService extends BaseApiService {
  public async getAudits(
    request: PaginatedListRequest,
  ): Promise<ResponseResult<PaginatedListResponse<GetAuditsAudit>>> {
    
    const response = await this.api.get(
      `${ApiEndpoint.V1.Audits.Segment}?${AddQueryParameters(request)}`,
    );

    return toResponseResult<PaginatedListResponse<GetAuditsAudit>>(response);
  }

  public async getAudit(id: number): Promise<ResponseResult<GetAuditsAudit>> {
    const response = await this.api.get(`${ApiEndpoint.V1.Audit.Segment}/${id}`);

    return toResponseResult<GetAuditsAudit>(response);
  }

  public async exportAuditsToExcel(): Promise<AxiosResponse | undefined> {
    try {
      const response = await this.api.get(`${ApiEndpoint.V1.ExportToExcel.Segment}`, {
            responseType: "blob",
            validateStatus: (status) => {
              return status < 500; // Resolve only if the status code is less than 500
          }
      });

      if (response.status === 200) {
        // Handle successful file download
        FileDownloadHelper.downloadExcelFile(response);
        return response;
      } else {
          // Handle error response
          const reader = new FileReader();
          return new Promise((resolve, reject) => {
              reader.onloadend = () => {
                  if (reader.result) {
                      try {
                          const errorData = JSON.parse(reader.result as string);
                          console.error("Error data: ", errorData);
                          resolve({ status: response.status, data: errorData } as AxiosResponse);
                      } catch (error) {
                          reject(new Error(`Failed to parse error response: ${error}`));
                      }
                  } else {
                      reject(new Error('Failed to read response'));
                  }
              };
              reader.onerror = () => reject(new Error('Failed to read response'));
              reader.readAsText(response.data);
          });
      }
    } catch (error) {
        console.error("Failed to export audits: ", error);
        throw error;
    }
  }

  public async getLookupAllAudits(): Promise<ResponseResult<ListResponse<GetAuditsAudit>>> {
    
    const response = await this.api.get(`${ApiEndpoint.V1.LookupAll.Segment}`);

    return toResponseResult<ListResponse<GetAuditsAudit>>(response); 
  
  }

}
