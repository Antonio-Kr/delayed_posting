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
import { IPostTogo } from './interfaces/post-togo.interface';
import { IPostRange } from './interfaces/post-range.interface';
import { IPostArchive } from './interfaces/post-archive.interface';

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

  async getAllPostsToGo(params: IPostTogo) {
    const userId = await this.getUserId(params.email);
    if (!userId) return [];

    let results: ISchedule[] = await this.scheduleModel
      .find({ userId, startsAt: { $gte: params.dateTime } })
      .exec();
    if (results.length == 0) return null;

    results = results.sort((a, b) => (a.startsAt > b.startsAt ? 1 : -1));

    //getting min date
    const minDate = results[0].startsAt;
    let tmp = results.filter(
      sch => sch.startsAt.toLocaleDateString() != minDate.toLocaleDateString(),
    );
    let nextDate = null;
    if (tmp.length != 0) nextDate = tmp[0].startsAt;

    //filter elems by min date
    results = results.filter(sch => {
      return sch.startsAt.toLocaleDateString() == minDate.toLocaleDateString();
    });

    const mappedResults = await this.mappedResults(results);

    return {
      results: mappedResults,
      nextDate,
    };
  }

  async getAllPostsDateRange(range: IPostRange) {
    const userId = await this.getUserId(range.email);
    if (!userId) return [];

    let results = await this.scheduleModel
      .find({ userId, startsAt: { $gt: range.from, $lt: range.to } })
      .exec();
    if (results.length == 0) return null;

    const mappedResults = await this.mappedResults(results);

    return { results: mappedResults };
  }

  async getAllPostsArch(params: IPostArchive) {
    const userId = await this.getUserId(params.email);
    if (!userId) return [];

    const toSkip: number = (+params.page - 1) * +params.limit;

    let results = await this.scheduleModel
      .find({ userId, startsAt: { $lt: params.dateTime } })
      .skip(toSkip)
      .limit(params.limit)
      .exec();
    if (results.length == 0) return null;

    let count = await this.scheduleModel
      .count({
        userId,
        startsAt: { $lt: params.dateTime },
      })
      .exec();

    const mappedResults = await this.mappedResults(results);
    return { results: mappedResults, totalCount: count };
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
        postTime: sch.startsAt,
      };
    });
  }
}
