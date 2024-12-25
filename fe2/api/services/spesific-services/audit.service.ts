/* eslint-disable prettier/prettier */
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

  public async exportAuditsToExcel(): Promise<void> {
    const response = await this.api.get(`${ApiEndpoint.V1.ExportToExcel.Segment}`, {
      responseType: "blob",
    });

    FileDownloadHelper.downloadExcelFile(response);
  }
}
