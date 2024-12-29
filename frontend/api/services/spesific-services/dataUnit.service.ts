import { BaseApiService } from "../base-api";
import { ApiEndpoint, GetDataUnitsDataUnit, CreateDataUnitRequest, UpdateDataUnitRequest } from "../types/dataUnit.types";
import { PaginatedListRequest } from "../types/commonRequest.types";
import { 
    PaginatedListResponse,
    ResponseResult,
    toResponseResult,
    SuccessResponse
} from "../types/commonResponses.types";

import { FileDownloadHelper } from "@/api/utils/FileDownloadHelper";
import { AddQueryParameters } from "@/api/utils/AddQueryParameters";
import { AxiosResponse } from "axios";

export class DataUnitService extends BaseApiService {

    public async getDataUnits(request: PaginatedListRequest): Promise<ResponseResult<PaginatedListResponse<GetDataUnitsDataUnit>>> {
        const response = await this.api.get(`${ApiEndpoint.V1.DataUnits.Segment}?${AddQueryParameters(request)}`);
        
        return toResponseResult<PaginatedListResponse<GetDataUnitsDataUnit>>(response);
    }

    public async getDataUnit(id: string): Promise<ResponseResult<GetDataUnitsDataUnit>> {
        const response = await this.api.get(`${ApiEndpoint.V1.DataUnit.Segment}/${id}`);

        return toResponseResult<GetDataUnitsDataUnit>(response);
    }

    public async exportDataUnitsToExcel(): Promise<AxiosResponse | undefined> {
        const response = await this.api.get(`${ApiEndpoint.V1.ExportToExcel.Segment}`, { responseType: 'blob', });
        if (response.status !== 200) {
            return undefined;
        }
        
        FileDownloadHelper.downloadExcelFile(response);
        return response;
    }

    public async createDataUnit(request: CreateDataUnitRequest): Promise<ResponseResult<GetDataUnitsDataUnit>> {
        const response = await this.api.post(`${ApiEndpoint.V1.DataUnit.Segment}`, request);

        return toResponseResult<GetDataUnitsDataUnit>(response);
    }

    public async updateDataUnit(request: UpdateDataUnitRequest): Promise<ResponseResult<GetDataUnitsDataUnit>> {
        const response = await this.api.put(`${ApiEndpoint.V1.DataUnit.Segment}/${request.id}`, request);

        return toResponseResult<GetDataUnitsDataUnit>(response);
    }

    public async deleteDataUnit(id: string): Promise<ResponseResult<SuccessResponse>> {
        const response = await this.api.delete(`${ApiEndpoint.V1.DataUnit.Segment}/${id}`);

        return toResponseResult<SuccessResponse>(response);
    }
}