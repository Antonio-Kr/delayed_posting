import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { connectionConstants } from 'src/constants';
import { ISchedule } from './interfaces/schedule.interface';

@Injectable()
export class SchedulesService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: connectionConstants.host,
        port: connectionConstants.schedulesMicroservicePort,
      },
    });
  }

  createSchedule(scheduleContent: ISchedule) {
    return this.client.send<any, ISchedule>('createSchedule', scheduleContent);
  }
}
