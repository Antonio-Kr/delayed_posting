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
      .then(user => user._id)
      .catch();

    const createdSchedule = new this.scheduleModel(scheduleContent);
    return await createdSchedule.save();
  }

  async getAllPostsToGo(params) {
    const userId = await this.client
      .send<IUser, string>('findOneByEmail', params.email)
      .toPromise()
      .then(user => user._id)
      .catch();

    if (!userId) return [];

    let results: ISchedule[] = await this.scheduleModel
      .find({ userId, startsAt: { $gt: params.dateTime } })
      .exec();

    if (results.length == 0) return null;

    const minDate = results.reduce((prev, curr) =>
      prev.startsAt < curr.startsAt ? prev : curr,
    ).startsAt;

    results = results.filter(
      sch => sch.startsAt.toLocaleDateString() == minDate.toLocaleDateString(),
    );
    const mappedResults = results.map(sch => {
      return {
        _id: sch._id,
        postId: sch.postId,
        postTime: sch.startsAt.toLocaleTimeString(),
      };
    });

    return {
      results: mappedResults,
      nextDate: new Date().setDate(minDate.getDate() + 1),
    };
  }

  async removeSchedule(scheduleId: string) {
    let res = await this.scheduleModel
      .findByIdAndRemove(scheduleId, {
        select: ['postId'],
      })
      .exec();
    console.log(res);
    return res;
  }
}
