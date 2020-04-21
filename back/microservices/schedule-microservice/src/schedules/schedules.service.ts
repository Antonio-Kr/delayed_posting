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
    scheduleContent.userId = await this.getUserId(scheduleContent.userId);

    const createdSchedule = new this.scheduleModel(scheduleContent);
    return await createdSchedule.save();
  }

  async getAllPostsToGo(params) {
    const userId = await this.getUserId(params.email);

    if (!userId) return [];

    let results: ISchedule[] = await this.scheduleModel
      .find({ userId, startsAt: { $gt: params.dateTime } })
      .exec();

    if (results.length == 0) return null;

    //getting min date
    const minDate = results.reduce((prev, curr) =>
      prev.startsAt < curr.startsAt ? prev : curr,
    ).startsAt;
    let isLast = true;

    //flter elems by min date
    results = results.filter(sch => {
      if (!(sch.startsAt == minDate)) isLast = false;
      return sch.startsAt.toLocaleDateString() == minDate.toLocaleDateString();
    });

    minDate.setDate(minDate.getDate() + 1);

    const mappedResults = await this.mappedResults(results);

    return {
      results: mappedResults,
      nextDate: isLast ? null : minDate,
    };
  }

  async getAllPostsDateRange(range) {
    const userId = await this.getUserId(range.email);
    if (!userId) return [];

    let results = await this.scheduleModel
      .find({ userId, startsAt: { $gt: range.from, $lt: range.to } })
      .exec();
    if (results.length == 0) return null;

    const mappedResults = await this.mappedResults(results);

    return mappedResults;
  }

  async getAllPostsArch(params: any) {
    const userId = await this.getUserId(params.email);
    if (!userId) return [];

    const toSkip: number = (+params.page - 1) * +params.limit;
    const limit: number = +params.limit;

    let results = await this.scheduleModel
      .find({ userId, startsAt: { $lt: params.dateTime } })
      .skip(toSkip)
      .limit(limit)
      .exec();

    if (results.length == 0) return null;

    const mappedResults = await this.mappedResults(results);
    return mappedResults;
  }

  async removeSchedule(scheduleId: string) {
    let res = await this.scheduleModel
      .findByIdAndRemove(scheduleId, {
        select: ['postId'],
      })
      .exec();
    return res;
  }

  private async getUserId(email) {
    return await this.client
      .send<IUser, string>('findOneByEmail', email)
      .toPromise()
      .then(user => user._id)
      .catch();
  }

  private async mappedResults(results) {
    return results.map(sch => {
      return {
        _id: sch._id,
        postId: sch.postId,
        providerId: sch.providerId,
        postTime: sch.startsAt.toLocaleTimeString(),
      };
    });
  }
}
