//const { pageSize = 10, pageNumber = 0, sort = [{ field: '_id', direction: 'ASC' }] } = pagination;

export enum SortDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

/**
 * Null sort option.
 */
export enum SortNulls {
  /**
   * All nulls will be first.
   */
  NULLS_FIRST = 'NULLS FIRST',
  /**
   * All nulls will be last.
   */
  NULLS_LAST = 'NULLS LAST',
}

export type SortDirectionType = 'ASC' | 'DESC';

/**
 * Interface to sort a field.
 * ```ts
 * // ORDER BY name DESC
 * {
 *   sorting: [{ field: 'name', direction: SortDirection.DESC }],
 * }
 * ```
 *
 * To sort on multiple fields
 *
 * ```ts
 * // ORDER BY name DESC, age ASC
 * {
 *   sorting: [
 *     { field: 'name', direction: SortDirection.DESC },
 *     { field: 'age', direction: SortDirection.ASC },
 *   ],
 * }
 * ```
 *
 * @typeparam T - the type of object to sort.
 */
export interface SortField<T> {
  //  A field in type T to sort on.
  field: keyof T;

  // The direction of the sort (ASC or DESC)
  direction: SortDirection;

  // The order that nulls values should be sorted.
  nulls?: SortNulls;
}
