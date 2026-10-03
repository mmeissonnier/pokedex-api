export interface Pagination {
  limit: number;
  offset: number;
}

export interface Page<T> {
  items: T[];
  total: number;
}
