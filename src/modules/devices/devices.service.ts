import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { Device } from './schemas/device.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ListDevicesDto } from './dto/list-devices.dto';
import { buildFilter, buildSorting } from 'src/core/helpers/filter-query';

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

  async findAll(listDevicesDto: ListDevicesDto<Device>) {
    const { pageSize = 10, page = 0, sort, filter } = listDevicesDto;
    const sorting = buildSorting<Device>(sort as unknown as string);
    const filtering = buildFilter(filter as unknown as string);

    const total = await this.deviceModel.estimatedDocumentCount();
    const items = await this.deviceModel
      .find(filtering)
      //.select('vendor')
      .limit(pageSize)
      .skip(page > 0 ? page - 1 : page)
      .sort(sorting)
      .exec();

    return {
      items,
      total,
    };
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
