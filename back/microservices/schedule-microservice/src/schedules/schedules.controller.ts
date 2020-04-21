import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ISchedule } from './interfaces/schedule.interface';
import { SchedulesService } from './schedules.service';
import { Cron } from '@nestjs/schedule'
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { SchedulerRegistry } from '@nestjs/schedule';


@Controller('schedules')
export class SchedulesController {
  constructor(private readonly scheduleService: SchedulesService) {
    
  }

  @MessagePattern('createSchedule')
  async createSchedule(scheduleContent: CreateScheduleDto) {
    return this.scheduleService.createSchedule(scheduleContent);
  }

  @MessagePattern('startSchedule')
  async schedulePosting(schedule:string){
    return await this.scheduleService.schedulePosting(schedule);
  }
}
