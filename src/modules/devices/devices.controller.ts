import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DevicesService } from './devices.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import {
  Pagination,
  PaginationParams,
} from 'src/core/decorators/pagination.decorator';
import { Sorting, SortingParams } from 'src/core/decorators/sorting.decorator';
import {
  Filtering,
  FilteringParams,
} from 'src/core/decorators/filtering.decorator';

@ApiTags('Devices')
@Controller({ path: 'devices', version: '1' })
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Post()
  create(@Body() createDeviceDto: CreateDeviceDto) {
    console.log(createDeviceDto);
    return this.devicesService.create(createDeviceDto);
  }

  @Get()
  @ApiQuery({
    name: 'page',
    required: true,
    description: 'Page number for pagination',
  })
  @ApiQuery({
    name: 'pageSize',
    required: true,
    description: 'Number of items per page for pagination',
  })
  @ApiQuery({
    name: 'sort',
    required: false,
    description: 'Sort criteria for ordering results',
    example: 'vendor:asc',
  })
  @ApiQuery({
    name: 'filter',
    required: false,
    description: 'Filter criteria for filtering results',
    example: 'vendor:like:vendor1',
  })
  findAll(
    @PaginationParams() paginationParams: Pagination,
    @SortingParams(['vendor', 'status']) sort?: Sorting,
    @FilteringParams(['vendor', 'status']) filter?: Filtering,
  ) {
    return this.devicesService.findAll(paginationParams, sort, filter);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.devicesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDeviceDto: UpdateDeviceDto) {
    return this.devicesService.update(+id, updateDeviceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.devicesService.remove(+id);
  }
}
