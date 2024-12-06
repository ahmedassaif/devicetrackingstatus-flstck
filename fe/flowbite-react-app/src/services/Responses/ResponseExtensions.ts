import { AxiosResponse } from 'axios';
import { ResponseResult } from './ResponseResult';

export function toResponseResult<T>(response: AxiosResponse): ResponseResult<T> {
    const result: ResponseResult<T> = {};
    if (response.status >= 200 && response.status < 300) {
        result.result = response.data;
    } else {
        result.error = {
        type: 'Error',
        title: response.statusText,
        status: response.status,
        detail: response.data?.message || 'An unknown error occurred',
        };
    }
    return result;
}
