import { SortField } from 'src/core/types';

export class ListDevicesDto<T> {
  pageSize: number;
  page: number;
  sort: SortField<T>[] = [];
  filter: any;
}
