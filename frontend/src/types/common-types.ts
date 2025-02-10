export type PaginationParams = {
    page?: number;
    size?: number;
}

export type PaginatedResponse<T> = {
    totalCount: number;
    page: number; // Current page
    size: number; // Current size
    data: Array<T>
}