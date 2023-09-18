import { FilterQuery } from 'mongoose';
import { getSchemaKey } from '.';
import { FilterRule, Filtering } from '../decorators/filtering.decorator';
import { Sorting } from '../decorators/sorting.decorator';
import { SortDirection, SortType } from '../types';

export const getOrder = (sort?: Sorting): SortType =>
  sort
    ? {
        [getSchemaKey(sort.field.toString())]:
          sort.direction.toUpperCase() === SortDirection.ASC ? 'asc' : 'desc'
      }
    : { _id: 'asc' };

const filterType = {
  [FilterRule.LIKE]: '$regex',
  [FilterRule.GREATER_THAN]: '$gt',
  [FilterRule.GREATER_THAN_OR_EQUALS]: '$gte',
  [FilterRule.LESS_THAN]: '$lt',
  [FilterRule.LESS_THAN_OR_EQUALS]: '$lte',
  [FilterRule.EQUALS]: '$eq',
  [FilterRule.NOT_EQUALS]: '$ne'
};

export const getWhere = <T>(filter: Filtering): FilterQuery<T> => {
  if (!filter) return {};

  return {
    [getSchemaKey(filter.field.toString())]: {
      [filterType[filter.rule]]: filter.value
    }
  } as any; // TODO check this later
};
