export interface PageApiData<T> {
    data: T[];
    page: number;
    total: number;
    size: number;
}
