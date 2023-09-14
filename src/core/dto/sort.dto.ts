//{"field": "vendor", "direction": "desc"}

import { ApiProperty } from '@nestjs/swagger';
import { SortDirection, SortField } from '../types';

export class SortDto<T> implements SortField<T> {
  @ApiProperty({ description: 'The sorting of the devices list' })
  field: keyof T;
  @ApiProperty({ description: 'The sorting of the devices list' })
  direction: SortDirection;
}
