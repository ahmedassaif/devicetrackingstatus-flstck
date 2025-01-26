import { BaseApiService } from "../base-api";
import { ApiEndpoint, GetDataUnitsDataUnit, CreateDataUnitRequest, UpdateDataUnitRequest, DataUnitDto } from "../types/dataUnit.types";
import { PaginatedListRequest, SelectorListRequest } from "../types/commonRequest.types";
import { 
    PaginatedListResponse,
    ResponseResult,
    toResponseResult,
    SuccessResponse,
    ListResponse
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
            console.error("Failed to export DataUnits: ", error);
            throw error;
        }
    }

    public async getLookupDataUnits(request: SelectorListRequest): Promise<ResponseResult<ListResponse<DataUnitDto>>> {
        const response = await this.api.get(`${ApiEndpoint.V1.LookupAll.Segment}`, { params: request });
        return toResponseResult<ListResponse<DataUnitDto>>(response);
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