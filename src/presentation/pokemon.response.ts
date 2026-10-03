import type { Page, Pagination } from '../shared/types/pagination.js';

export interface PageResponse<T> {
  items: T[];
  total: number;
  limit: number;
  offset: number;
}

export function toPageResponse<T>(
  page: Page<T>,
  { limit, offset }: Pagination,
): PageResponse<T> {
  return { items: page.items, total: page.total, limit, offset };
}
