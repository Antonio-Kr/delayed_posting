import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { SchedulesService } from './schedules.service';
import { ISchedule } from './interfaces/schedule.interface';
import { UserService } from 'src/user/user.service';

@Controller('schedules')
export class SchedulesController {
  constructor(private readonly scheduleService: SchedulesService) {}

  @MessagePattern('createSchedule')
  async createSchedule(scheduleContent: ISchedule) {
    return this.scheduleService.createSchedule(scheduleContent);
  }

  @MessagePattern('getAllPostsToGo')
  async getAllPostsToGo(params) {
    return this.scheduleService.getAllPostsToGo(params);
  }

  @MessagePattern('removePost')
  async removePost(scheduleId: string) {
    return this.scheduleService.removePost(scheduleId);
  }
}