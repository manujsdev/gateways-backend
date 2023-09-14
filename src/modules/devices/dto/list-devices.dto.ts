import { ApiProperty } from '@nestjs/swagger';
import { SortField } from 'src/core/types';

export class ListDevicesDto<T> {
  @ApiProperty({ description: 'The page size of the devices list' })
  pageSize: number;
  @ApiProperty({ description: 'The page of the devices list' })
  page: number;
  @ApiProperty({
    description: 'The sorting of the devices list',
    required: false,
    type: String,
    example: [{ field: 'vendor', direction: 'asc' }],
  })
  sort: SortField<T>[] = [];
  filter: any;
}
