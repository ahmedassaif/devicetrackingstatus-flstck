import { ApiEndpoint } from './Constants/ApiEndpoint';
import { ResponseResult } from '../Responses/ResponseResult';
import { PaginatedListResponse } from '../Responses/PaginatedListResponse';
import { GetDataUnitsDataUnit } from './Requests/GetDataUnitsDataUnit';
import { GetDataUnitsRequest } from './Requests/GetDataUnitsRequest';
import api from '../api';  // Import the api instance from api.ts
import { FileDownloadHelper } from  '../utils/FileDownloadHelper';

// Import the utility functions
import { AddQueryParameters } from '../utils/AddQueryParameters';
import { toResponseResult } from '../utils/RestResponseExtensions';
import { HandleError } from '../utils/HandleError';
import { log } from 'console';
import { CreateDataUnitRequest } from './Requests/CreateDataUnitRequest';
import { UpdateDataUnitRequest } from './Requests/UpdateDataUnitRequest';
import { SuccessResponse } from '../Responses/SuccessResponse';

class DataUnitService {

  public async getDataUnits(
    request: GetDataUnitsRequest
  ): Promise<ResponseResult<PaginatedListResponse<GetDataUnitsDataUnit>>> {
    const queryParams = AddQueryParameters(request);

    try {
      const response = await api.get(`${ApiEndpoint.V1.DataUnits.Segment}?${queryParams}`);

      // Use the utility to process the response
      const outputAPI = toResponseResult<PaginatedListResponse<GetDataUnitsDataUnit>>(response);
      return outputAPI;

    } catch (error: any) {
      // Handle errors based on Axios response
      return HandleError<PaginatedListResponse<GetDataUnitsDataUnit>>(error);
    }
  }

  public async getDataUnit(id: string): Promise<ResponseResult<GetDataUnitsDataUnit>> {

    try {
      
      const response = await api.get(`${ApiEndpoint.V1.DataUnit.Segment}/${id}`);

      return toResponseResult<GetDataUnitsDataUnit>(response);

    } catch (error) {
      return HandleError<GetDataUnitsDataUnit>(error);
    }
  }

  public async exportDataUnitsToExcel(): Promise<void> {
    try {
      
      const response = await api.get(`${ApiEndpoint.V1.ExportToExcel.Segment}`, { responseType: 'blob', });
      
      FileDownloadHelper.downloadExcelFile(response);

    } catch (error) {
      console.error('Error exporting DataUnits', error); 
      throw error;
    }
  }

  public async createDataUnit(
    request: CreateDataUnitRequest
  ): Promise<ResponseResult<GetDataUnitsDataUnit>> {
    
    try {
      const response = await api.post(`${ApiEndpoint.V1.DataUnit.Segment}`, request);

      return toResponseResult<GetDataUnitsDataUnit>(response);

    } catch (error) {
      return HandleError<GetDataUnitsDataUnit>(error);
    }
  }

  public async updateDataUnit(
    request: UpdateDataUnitRequest
  ): Promise<ResponseResult<GetDataUnitsDataUnit>> {
    
    try {
      const response = await api.put(`${ApiEndpoint.V1.DataUnit.Segment}/${request.id}`, request);

      console.log('response: ', response);

      return toResponseResult<GetDataUnitsDataUnit>(response);

    } catch (error) {
      return HandleError<GetDataUnitsDataUnit>(error);
    }
  }

  public async deleteDataUnit(id: string): Promise<ResponseResult<SuccessResponse>> {
    try {
      const response = await api.delete(`${ApiEndpoint.V1.DataUnit.Segment}/${id}`);

      return toResponseResult<SuccessResponse>(response);

    } catch (error) {
      return HandleError<SuccessResponse>(error);
    }
  }

}

export default DataUnitService;