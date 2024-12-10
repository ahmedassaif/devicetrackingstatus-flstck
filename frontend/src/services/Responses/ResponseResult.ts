export interface ResponseResult<T> {
    result?: T;
    error?: ErrorResponse;
}

export interface ErrorResponse {
    type: string;
    title: string;
    status: number;
    detail: string;
}