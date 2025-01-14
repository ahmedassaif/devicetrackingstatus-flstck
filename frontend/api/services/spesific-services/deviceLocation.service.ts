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

/*************  ✨ Codeium Command ⭐  *************/
    /**
     * Update a DeviceLocation
     * @param request The request payload containing the DeviceLocation data to update
     * @returns A ResponseResult containing the updated DeviceLocation, or an error if one occurs
     */
/******  d2263235-6e8b-48b1-bc20-26cf55c11a7d  *******/    public async deleteDeviceLocation(id: string): Promise<ResponseResult<SuccessResponse>> {
        const response = await this.api.delete(`${ApiEndpoint.V1.DeviceLocation.Segment}/${id}`);

        return toResponseResult<SuccessResponse>(response);
    }
}