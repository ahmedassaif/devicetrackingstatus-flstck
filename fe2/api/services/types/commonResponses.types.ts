/* eslint-disable prettier/prettier */
import { AxiosResponse } from "axios";

import {
  createErrorResponse,
  parseContentDisposition,
} from "@/api/utils/error-handler";


/* eslint-disable prettier/prettier */
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

export interface SuccessResponse extends Response{}

export interface PaginatedListResponse<T> extends Response {
    items: T[];
    pageIndex: number;
    totalPages: number;
    totalCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}

export async function toResponseResult<T>(
  axiosResponse: AxiosResponse<T>,
): Promise<ResponseResult<T>> {
  const responseResult: ResponseResult<T> = {};

  try {
    if (axiosResponse.status >= 200 && axiosResponse.status < 300) {
      if (axiosResponse.headers["content-disposition"]) {
        const contentDisposition = axiosResponse.headers["content-disposition"];
        const { fileName } = parseContentDisposition(contentDisposition);

        if (!axiosResponse.data) {
          throw new Error("Response content is null");
        }

        responseResult.result = {
          fileName,
          content: axiosResponse.data,
          contentType: axiosResponse.headers["content-type"],
        } as unknown as T;
      } else {
        responseResult.result = axiosResponse.data as T;
      }
    } else {
      responseResult.error = createErrorResponse(axiosResponse);
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