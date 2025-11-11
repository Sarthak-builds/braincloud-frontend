export interface ApiError {
    message: string;
}

export interface ApiResponse<T = any> {
    data?: T;
    error?: ApiError;
}