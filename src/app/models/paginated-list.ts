export class PaginatedList<T> {
  items: T;
  pageNumber?: number;
  totalPages?: number | undefined;
  totalCount: number ;
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
}
