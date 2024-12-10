// src/utils/handleError.ts
import { ResponseResult } from '../Responses/ResponseResult';

export const HandleError = <T>(error: any): ResponseResult<T> => {
  const result: ResponseResult<T> = {
    error: {
      type: 'NetworkError',
      title: 'Network Error',
      status: error?.response?.status || 0,
      detail: error?.message || 'An unexpected error occurred',
    }
  };

  console.error('Error object:', error);

  return result;
};
