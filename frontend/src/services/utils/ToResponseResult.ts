// src/utils/toResponseResult.ts
import { ResponseResult } from '../Responses/ResponseResult';

export const ToResponseResult = <T>(data: any): ResponseResult<T> => {
  console.log('Processing API response in ToResponseResult:', data);
  if (!data || typeof data !== 'object') {
        console.warn('Unexpected response format:', data);
        return {
          error: {
              type: 'InvalidResponse',
              title: 'Invalid Response',
              detail: 'The API returned an unexpected format.',
              status: 0, // Provide a default or appropriate status code
          },
      };
    }
  
  const result: ResponseResult<T> = {};

  // if (data && data.result) {
  //   result.result = data as T;
  //   console.log('Raw response data:', data);
  // }

  if (data && data.error) {
    result.error = data.error;
  }

  // return result;
  return { result: data as T }; // Assuming the data matches T
};
