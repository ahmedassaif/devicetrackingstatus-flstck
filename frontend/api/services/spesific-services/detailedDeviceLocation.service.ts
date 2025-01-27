/* eslint-disable @typescript-eslint/no-unused-vars */
import { BaseApiService } from "../base-api";
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
import axios, { AxiosResponse } from "axios";
import { createErrorResponse } from "@/api/utils/error-handler";

import { 
    ApiEndpoint,
    DetailedDeviceLocationDto, 
    GetDetailedDeviceLocationsDetailedDeviceLocation, 
    CreateDetailedDeviceLocationRequest, 
    UpdateDetailedDeviceLocationRequest,
    GetLookupDetailedDeviceLocationsByDeviceLocationRequest,
    GetLookupDetailedDeviceLocationsByDeviceLocationResponse  
} from "../types/detailedDeviceLocation.types";


export class DetailedDeviceLocationService extends BaseApiService {

    public async getDetailedDeviceLocations(request: PaginatedListRequest): Promise<ResponseResult<PaginatedListResponse<GetDetailedDeviceLocationsDetailedDeviceLocation>>> {
        const response = await this.api.get(`${ApiEndpoint.V1.DetailedDeviceLocations.Segment}?${AddQueryParameters(request)}`);
        
        return toResponseResult<PaginatedListResponse<GetDetailedDeviceLocationsDetailedDeviceLocation>>(response);
    }

    public async getDetailedDeviceLocation(id: string): Promise<ResponseResult<GetDetailedDeviceLocationsDetailedDeviceLocation>> {
        const response = await this.api.get(`${ApiEndpoint.V1.DetailedDeviceLocation.Segment}/${id}`);

        return toResponseResult<GetDetailedDeviceLocationsDetailedDeviceLocation>(response);
    }

    public async exportDetailedDeviceLocationsToExcel(): Promise<AxiosResponse | undefined> {
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
            // Handle Axios errors and convert to ResponseResult
            throw error;
        }
    }

    public async getLookupDetailedDeviceLocationsByDeviceLocation(request: GetLookupDetailedDeviceLocationsByDeviceLocationRequest): Promise<ResponseResult<ListResponse<GetLookupDetailedDeviceLocationsByDeviceLocationResponse>>> {
        const response = await this.api.get(`${ApiEndpoint.V1.LookupAll.Segment}?${AddQueryParameters(request)}`);
        
        return toResponseResult<ListResponse<GetLookupDetailedDeviceLocationsByDeviceLocationResponse>>(response);
    }

    public async createDetailedDeviceLocation(request: CreateDetailedDeviceLocationRequest): Promise<ResponseResult<GetDetailedDeviceLocationsDetailedDeviceLocation>> {
        try {
            const response = await this.api.post(`${ApiEndpoint.V1.DetailedDeviceLocations.Segment}`, request);
            return toResponseResult<GetDetailedDeviceLocationsDetailedDeviceLocation>(response);
        } catch (error) {
            // Handle Axios errors and convert to ResponseResult
            if (axios.isAxiosError(error)) {
                return {
                    error: createErrorResponse(error.response!)
                };
            }
            throw error;
        }
    }

    public async updateDetailedDeviceLocation(request: UpdateDetailedDeviceLocationRequest): Promise<ResponseResult<GetDetailedDeviceLocationsDetailedDeviceLocation>> {
        try {
            const response = await this.api.put(`${ApiEndpoint.V1.DetailedDeviceLocation.Segment}/${request.id}`, request);
            return toResponseResult<GetDetailedDeviceLocationsDetailedDeviceLocation>(response);
        } catch (error) {
            // Handle Axios errors and convert to ResponseResult
            if (axios.isAxiosError(error)) {
                return {
                    error: createErrorResponse(error.response!)
                };
            }
            throw error;
        }
    }

    public async deleteDetailedDeviceLocation(id: string): Promise<ResponseResult<SuccessResponse>> {
        try {
            const response = await this.api.delete(`${ApiEndpoint.V1.DetailedDeviceLocation.Segment}/${id}`);
            return toResponseResult<SuccessResponse>(response);
        } catch (error) {
            // Handle Axios errors and convert to ResponseResult
            if (axios.isAxiosError(error)) {
                return {
                    error: createErrorResponse(error.response!)
                };
            }
            throw error;
        }
    }

}