import { ApiProperty } from '@nestjs/swagger';
import { StatusType } from '../types';

export class CreateDeviceDto {
  //uid: string;
  @ApiProperty({ description: 'The vendor of the device' })
  readonly vendor: string;
  @ApiProperty({
    description: 'The status of the device',
    enum: ['online', 'offline']
  })
  readonly status: StatusType;
}
