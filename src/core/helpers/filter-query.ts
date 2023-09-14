import { getSchemaKey } from '.';
import { SortDirection, SortField } from '../types';

export function buildSorting<Entity>(sorts: string) {
  const sort = {} as any;
  const convertedSorts = JSON.parse(sorts) || [];
  convertedSorts.forEach(
    (sorting: SortField<Entity>) =>
      (sort[getSchemaKey(sorting.field.toString())] =
        sorting.direction.toUpperCase() === SortDirection.ASC ? 'asc' : 'desc'),
  );
  return sort;
}

export function buildFilter(filters?: string) {
  const filter = {} as any;
  const convertedFilter = filters ? JSON.parse(filters) : [];
  convertedFilter.forEach(
    (filtering: any) =>
      (filter[getSchemaKey(filtering.field.toString())] = {
        $regex: filtering.regex,
        $options: 'i',
      }),
  );
  return filter;
}
