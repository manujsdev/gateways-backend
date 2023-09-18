import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { Device } from './schemas/device.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { CoreService } from 'src/core/core.service';

@Injectable()
export class DevicesService extends CoreService<Device> {
  constructor(@InjectModel(Device.name) protected readonly deviceModel: Model<Device>) {
    super(deviceModel);
  }

  async create(createDeviceDto: CreateDeviceDto) {
    console.log(createDeviceDto);
    try {
      const newDevice = new this.deviceModel(createDeviceDto);
      return await newDevice.save();
    } catch (error) {
      throw new HttpException(
        {
          error,
          status: HttpStatus.UNPROCESSABLE_ENTITY
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
        {
          cause: error
        }
      );
    }
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
