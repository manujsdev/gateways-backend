import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { Device } from './schemas/device.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { getOrder, getWhere } from 'src/core/helpers/filter-query';
import { Pagination } from 'src/core/decorators/pagination.decorator';
import { Sorting } from 'src/core/decorators/sorting.decorator';
import { Filtering } from 'src/core/decorators/filtering.decorator';
import { PaginatedResource } from 'src/core/dto/paginatedItems.dto';

// TODO Check this repository: https://github.com/scalablescripts/nest-search-mongo/blob/main/src/product/product.service.ts

@Injectable()
export class DevicesService {
  constructor(@InjectModel(Device.name) private deviceModel: Model<Device>) {}

  async create(createDeviceDto: CreateDeviceDto) {
    console.log(createDeviceDto);
    try {
      const newDevice = new this.deviceModel(createDeviceDto);
      return await newDevice.save();
    } catch (error) {
      throw new HttpException(
        {
          error,
          status: HttpStatus.UNPROCESSABLE_ENTITY,
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
        {
          cause: error,
        },
      );
    }
  }

  async findAll(
    { page, pageSize, offset }: Pagination,
    sort?: Sorting,
    filter?: Filtering,
  ): Promise<PaginatedResource<Partial<Device>>> {
    const where = getWhere(filter);
    const order = getOrder(sort);
    const total = await this.countTotal();

    const items = await this.deviceModel
      .find(where)
      //.select('vendor')
      .limit(pageSize)
      .skip(offset)
      .sort(order)
      .exec();

    return {
      total,
      page,
      pageSize,
      data: items,
    };
  }

  async countTotal() {
    return await this.deviceModel.estimatedDocumentCount().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} device`;
  }

  update(id: number, updateDeviceDto: UpdateDeviceDto) {
    return `This action updates a #${id} device`;
  }

  remove(id: number) {
    return `This action removes a #${id} device`;
  }

  test() {
    console.log('test');
    return 'test';
  }
}
