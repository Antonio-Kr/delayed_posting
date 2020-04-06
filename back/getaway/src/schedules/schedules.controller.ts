import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { SchedulesService } from './schedules.service';
import { ISchedule } from './interfaces/schedule.interface';

@Controller('schedules')
export class SchedulesController {
  constructor(private readonly scheduleService: SchedulesService) {}

  @MessagePattern('createSchedule')
  async createSchedule(scheduleContent: ISchedule) {
    return this.scheduleService.createSchedule(scheduleContent);
  }
}
