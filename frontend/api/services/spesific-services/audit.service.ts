import { BaseApiService } from "../base-api";
import { ApiEndpoint, GetAuditsAudit } from "../types/audit.types";
import { PaginatedListRequest } from "../types/commonRequest.types";
import { 
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
        });

        // If response status is not 200, parse the error message
        if (response.status !== 200) {
          const reader = new FileReader();
          return new Promise((resolve, reject) => {
              reader.onload = () => {
                  if (reader.result) {
                      const errorData = JSON.parse(reader.result as string);
                      console.error('Failed to export audits: ', errorData);
                      resolve({ status: response.status, data: errorData } as AxiosResponse);
                  } else {
                      reject(new Error('Failed to read response'));
                  }
              };
              reader.onerror = () => reject(new Error('Failed to read response'));
              reader.readAsText(response.data);
          });
      } else {
          // Handle successful file download
          FileDownloadHelper.downloadExcelFile(response);
          return response;
      }
    } catch (error) {
        console.error("Failed to export audits: ", error);
        throw error;
    }
  }

}
