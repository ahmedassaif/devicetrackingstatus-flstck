import { AxiosResponse } from 'axios';

export abstract class Response {
    timestamp: Date;
  
    constructor() {
      this.timestamp = new Date(); // Sets the current timestamp
    }
  }
  

export interface FileResponse extends Response {
  fileName: string;
  content: ArrayBuffer;
  contentType: string;
}

export interface CommonErrorResponse {
  type: string;
  title: string;
  status: number;
  detail: string;
  exception?: Error;
}

export interface BadRequestResponse extends CommonErrorResponse {}

export interface ServiceUnavailableResponse extends CommonErrorResponse {}

export interface ResponseResult<T> {
  result?: T;
  error?: CommonErrorResponse;
}

function parseContentDisposition(contentDisposition: string): { fileName: string } {
  const match = contentDisposition.match(/filename="(.+)"/);
  if (!match || !match[1]) {
    throw new Error('Content-Disposition header does not contain a valid filename.');
  }
  return { fileName: match[1] };
}

export async function toResponseResult<T extends Response>(
    axiosResponse: AxiosResponse
  ): Promise<ResponseResult<T>> {
    const responseResult: ResponseResult<T> = {};
    
    try {
      
      if (axiosResponse.status >= 200 && axiosResponse.status < 300) {
  
        if (axiosResponse.headers['content-disposition']) {
          
          const contentDisposition = axiosResponse.headers['content-disposition'];
          const { fileName } = parseContentDisposition(contentDisposition);
  
          if (!axiosResponse.data) {
            throw new Error('Response content is null');
          }
  
          responseResult.result = {
            fileName,
            content: axiosResponse.data,
            contentType: axiosResponse.headers['content-type']
          } as unknown as T;
  
        } else {
          responseResult.result = axiosResponse.data as T;
        }
  
      } else {
        responseResult.error = createErrorResponse(axiosResponse);
      }
  
    } catch (error) {
      console.error('Error while processing response:', error);
      responseResult.error = {
        type: 'https://datatracker.ietf.org/doc/html/rfc7231#section-6.6',
        title: `${(error as Error).name}: ${(error as Error).message}`,
        status: axiosResponse.status,
        detail: `${axiosResponse.data} [${(error as Error).name}: ${(error as Error).message}]`
      };
    }
  
    return responseResult;
  }
  

function createErrorResponse(response: AxiosResponse): CommonErrorResponse {
  if (response.status === 0 && response.statusText === 'Network Error') {
    return {
      title: 'Service Unavailable',
      status: 503,
      type: 'https://datatracker.ietf.org/doc/html/rfc7231#section-6.6.4',
      detail: `Service at ${response.config.url} is not available. Error message: ${response.statusText}`
    };
  }

  switch (response.status) {
    case 404:
      return {
        title: 'The specified resource was not found',
        status: 404,
        type: 'https://tools.ietf.org/html/rfc7231#section-6.5.4',
        detail: `The specified resource at ${response.config.url} was not found.`
      };
    case 415:
      return {
        title: 'Unsupported Media Type',
        status: 415,
        type: 'https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.13',
        detail: 'The server is refusing to accept the request because the media type is not supported.'
      };
    case 401:
      return {
        title: 'The requested resource requires authentication.',
        status: 401,
        type: 'https://datatracker.ietf.org/doc/html/rfc7235#section-3.1',
        detail: 'The server is refusing to process the request because the user is unauthorized.'
      };
    default:
      return {
        title: 'Unknown Error',
        status: 500,
        type: 'https://datatracker.ietf.org/doc/html/rfc7231#section-6.6.1',
        detail: 'Something went wrong.'
      };
  }
}
