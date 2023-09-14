//const { pageSize = 10, pageNumber = 0, sort = [{ field: '_id', direction: 'ASC' }] } = pagination;

import { SortOrder } from 'mongoose';

export type SortType =
  | string
  | {
      [key: string]:
        | SortOrder
        | {
            $meta: any;
          };
    }
  | [string, SortOrder][];

export enum SortDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

export type SortDirectionType = 'ASC' | 'DESC';
