import { PaginatedListResponse } from "../Responses/PaginatedListResponse";

/**
 * Converts a PaginatedListResponse to a TableData format compatible with Flowbite React.
 * 
 * @param result - The paginated response containing the data.
 * @returns TableData - An object with the total number of items and the list of items.
 */
export function toTableData<T>(result: PaginatedListResponse<T>): TableData<T> {
  return {
    totalItems: result.totalCount,
    items: result.items,
  };
}

interface TableData<T> {
    totalItems: number;
    items: T[];
  }