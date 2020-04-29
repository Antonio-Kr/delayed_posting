import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { SchedulesService } from './schedules.service';
import { ISchedule } from './interfaces/schedule.interface';
import { UserService } from 'src/user/user.service';
import { IPostTogo } from './interfaces/post-togo.interface';
import { IPostRange } from './interfaces/post-range.interface';
import { IPostArchive } from './interfaces/post-archive.interface';

@Controller('schedules')
export class SchedulesController {
  constructor(private readonly scheduleService: SchedulesService) {}

  @MessagePattern('createSchedule')
  async createSchedule(scheduleContent: ISchedule) {
    return await this.scheduleService.createSchedule(scheduleContent);
  }

  @MessagePattern('getAllPostsToGo')
  async getAllPostsToGo(params: IPostTogo) {
    return await this.scheduleService.getAllPostsToGo(params);
  }

  @MessagePattern('getAllPostsDateRange')
  async getAllPostsDateRange(range: IPostRange) {
    return this.scheduleService.getAllPostsDateRange(range);
  }

  @MessagePattern('getAllPostsArch')
  async getAllPostsArch(params: IPostArchive) {
    return await this.scheduleService.getAllPostsArch(params);
  }

  @MessagePattern('removePost')
  async removePost(scheduleId: string) {
    return this.scheduleService.removePost(scheduleId);
  }
}
