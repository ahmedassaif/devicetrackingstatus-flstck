import { BaseApiService } from "../base-api";
import { ApiEndpoint, GetDeviceLocationsDeviceLocation, CreateDeviceLocationRequest, UpdateDeviceLocationRequest, DeviceLocationDto } from "../types/deviceLocation.types";
import { PaginatedListRequest } from "../types/commonRequest.types";
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

export class DeviceLocationService extends BaseApiService {

    public async getDeviceLocations(request: PaginatedListRequest): Promise<ResponseResult<PaginatedListResponse<GetDeviceLocationsDeviceLocation>>> {
        const response = await this.api.get(`${ApiEndpoint.V1.DeviceLocations.Segment}?${AddQueryParameters(request)}`);
        
        return toResponseResult<PaginatedListResponse<GetDeviceLocationsDeviceLocation>>(response);
    }

    public async getDeviceLocation(id: string): Promise<ResponseResult<GetDeviceLocationsDeviceLocation>> {
        const response = await this.api.get(`${ApiEndpoint.V1.DeviceLocation.Segment}/${id}`);

        return toResponseResult<GetDeviceLocationsDeviceLocation>(response);
    }

    public async exportDeviceLocationsToExcel(): Promise<AxiosResponse | undefined> {
        const response = await this.api.get(`${ApiEndpoint.V1.ExportToExcel.Segment}`, { responseType: 'blob', });
        if (response.status !== 200) {
            return undefined;
        }
        
        FileDownloadHelper.downloadExcelFile(response);
        return response;
    }

    public async getLookupAllDeviceLocations(): Promise<ResponseResult<ListResponse<DeviceLocationDto>>> {
        
        const response = await this.api.get(`${ApiEndpoint.V1.LookupAll.Segment}`);

        return toResponseResult<ListResponse<DeviceLocationDto>>(response);
        
    }

    public async createDeviceLocation(request: CreateDeviceLocationRequest): Promise<ResponseResult<GetDeviceLocationsDeviceLocation>> {
        const response = await this.api.post(`${ApiEndpoint.V1.DeviceLocation.Segment}`, request);

        return toResponseResult<GetDeviceLocationsDeviceLocation>(response);
    }

    public async updateDeviceLocation(request: UpdateDeviceLocationRequest): Promise<ResponseResult<GetDeviceLocationsDeviceLocation>> {
        const response = await this.api.put(`${ApiEndpoint.V1.DeviceLocation.Segment}/${request.id}`, request);

        return toResponseResult<GetDeviceLocationsDeviceLocation>(response);
    }

    public async deleteDeviceLocation(id: string): Promise<ResponseResult<SuccessResponse>> {
        const response = await this.api.delete(`${ApiEndpoint.V1.DeviceLocation.Segment}/${id}`);

        return toResponseResult<SuccessResponse>(response);
    }
}