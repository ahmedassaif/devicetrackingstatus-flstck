import { AxiosResponse } from "axios";

import {
  createErrorResponse,
  parseContentDisposition,
} from "@/api/utils/error-handler";


export interface CommonErrorResponse {
  type: string;
  title: string;
  status: number;
  detail: string;
  exception?: Error;
}
export interface ResponseResult<T> {
  result?: T;
  error?: CommonErrorResponse;
}

export interface PaginatedListResponse<T> extends Response {
    totalItems: number;
    items: T[];
    pageIndex: number;
    totalPages: number;
    totalCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
} 

export interface Response {
    timestamp: Date;
  }

export type SuccessResponse = Response

export interface PaginatedListResponse<T> extends Response {
    items: T[];
    pageIndex: number;
    totalPages: number;
    totalCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}

export interface ListResponse<T> extends Response 
{
  items: T[];
}

interface ErrorResponse {
  message?: string;
  // Add other possible error fields from your backend
  detail?: string;
  title?: string;
}

export async function toResponseResult<T>(
  axiosResponse: AxiosResponse<T>,
): Promise<ResponseResult<T>> {
  const responseResult: ResponseResult<T> = {};

  try {
    if (axiosResponse.status >= 200 && axiosResponse.status < 300) {
      // console.log("1");
      // console.log(axiosResponse);
      if (axiosResponse.headers["content-disposition"]) {
        const contentDisposition = axiosResponse.headers["content-disposition"];
        const { fileName } = parseContentDisposition(contentDisposition);
        // console.log("2");
        if (!axiosResponse.data) {
          // console.log("3");
          throw new Error("Response content is null");
        }

        responseResult.result = {
          fileName,
          content: axiosResponse.data,
          contentType: axiosResponse.headers["content-type"],
        } as unknown as T;
      } else {
        // console.log("4");
        responseResult.result = axiosResponse.data as T;
      }
    } else {
      // console.log("5");
      responseResult.error = createErrorResponse(axiosResponse);

      // Add direct error message from backend if available
      // Modify the line in commonResponses.types.ts
      if (axiosResponse.data && typeof axiosResponse.data === 'object') {
          // responseResult.error.detail = (axiosResponse.data as { message?: string }).message || responseResult.error.detail;
          const errorData = axiosResponse.data as ErrorResponse;
          if (errorData.message) {
            responseResult.error.detail = errorData.message;
          }
      }
    }
  } catch (error) {
    
    responseResult.error = {
      type: "https://datatracker.ietf.org/doc/html/rfc7231#section-6.6",
      title: `${(error as Error).name}: ${(error as Error).message}`,
      status: axiosResponse.status,
      detail: `${axiosResponse.data} [${(error as Error).name}: ${(error as Error).message}]`,
    };
  }

  return responseResult;
}

export function toTableData<T>(result: PaginatedListResponse<T>): TableData<T> {
  return {
    totalItems: result.totalCount,
    items: result.items,
  };
}

export function toListData<T>(result: ListResponse<T>): ListData<T> {
  return {
    items: result.items,
  };
}

interface TableData<T> {
    totalItems: number;
    items: T[];
}

interface ListData<T> {
    items: T[];
}