import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ISchedule } from './interfaces/schedule.interface';
import { SchedulesService } from './schedules.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { IPostTogo } from './interfaces/post-togo.interface';
import { IPostRange } from './interfaces/post-range.interface';
import { IPostArchive } from './interfaces/post-archive.interface';

@Controller('schedules')
export class SchedulesController {
  constructor(private readonly scheduleService: SchedulesService) {}

  @MessagePattern('createSchedule')
  async createSchedule(scheduleContent: CreateScheduleDto) {
    return this.scheduleService.createSchedule(scheduleContent);
  }

  @MessagePattern('getAllPostsToGo')
  async getAllPostsToGo(params: IPostTogo) {
    return this.scheduleService.getAllPostsToGo(params);
  }

  @MessagePattern('getAllPostsDateRange')
  async getAllPostsDateRange(range: IPostRange) {
    return this.scheduleService.getAllPostsDateRange(range);
  }

  @MessagePattern('getAllPostsArch')
  async getAllPostsArch(params: IPostArchive) {
    return this.scheduleService.getAllPostsArch(params);
  }

  @MessagePattern('removeSchedule')
  async removeSchedule(scheduleId: string) {
    return this.scheduleService.removeSchedule(scheduleId);
  }
}
