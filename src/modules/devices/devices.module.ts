import { Module } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { DevicesController } from './devices.controller';
import { DeviceSchema } from './schemas/device.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Device } from './entities/device.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Device.name, schema: DeviceSchema }])],
  controllers: [DevicesController],
  providers: [DevicesService]
})
export class DevicesModule {}
