import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { StatusType } from '../types';
import { HydratedDocument } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

//- UID (number);
//- vendor (string);
//- date created;
//- status (online/offline).
//
export type DeviceDocument = HydratedDocument<Device>;

@Schema({
  collection: 'devices',
  timestamps: true,
})
export class Device {
  _id?: string;

  @Prop({ unique: true, default: uuidv4 })
  uid: string;

  @Prop({ required: true })
  vendor: string;

  @Prop({ required: true, default: 'offline' })
  status: StatusType;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const DeviceSchema = SchemaFactory.createForClass(Device);
