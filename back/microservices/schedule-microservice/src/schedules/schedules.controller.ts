import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ISchedule } from './interfaces/schedule.interface';
import { SchedulesService } from './schedules.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';

@Controller('schedules')
export class SchedulesController {
  constructor(private readonly scheduleService: SchedulesService) {}

  @MessagePattern('createSchedule')
  async createSchedule(scheduleContent: CreateScheduleDto) {
    return this.scheduleService.createSchedule(scheduleContent);
  }

  @MessagePattern('getAllPostsToGo')
  async getAllPostsToGo(params) {
    return this.scheduleService.getAllPostsToGo(params);
  }

  @MessagePattern('getAllPostsDateRange')
  async getAllPostsDateRange(range) {
    return this.scheduleService.getAllPostsDateRange(range);
  }

  @MessagePattern('removeSchedule')
  async removeSchedule(scheduleId: string) {
    return this.scheduleService.removeSchedule(scheduleId);
  }
}
