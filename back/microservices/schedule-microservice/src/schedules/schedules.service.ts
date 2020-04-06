import { Injectable } from '@nestjs/common';
import { ISchedule } from './interfaces/schedule.interface';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { connectionConstants } from 'src/constants';
import { IUser } from './interfaces/users.interface';

@Injectable()
export class SchedulesService {
  private client: ClientProxy;

  constructor(
    @InjectModel('Schedule')
    private scheduleModel: Model<ISchedule>,
  ) {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: connectionConstants.host,
        port: connectionConstants.userMicroservicePort,
      },
    });
  }

  async createSchedule(scheduleContent: CreateScheduleDto): Promise<ISchedule> {
    scheduleContent.userId = await this.client
      .send<IUser, string>('findOneByEmail', scheduleContent.userId)
      .toPromise()
      .then(user => user._id);

    const createdSchedule = new this.scheduleModel(scheduleContent);
    return await createdSchedule.save();
  }
}
