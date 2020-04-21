import { Module } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { SchedulesController } from './schedules.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleSchema } from './schemas/schedule.schema';
import { ScheduleModule } from '@nestjs/schedule'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Schedule',
        schema: ScheduleSchema,
      },
    ]),
    ScheduleModule.forRoot()
  ],
  providers: [SchedulesService],
  controllers: [SchedulesController],
})
export class SchedulesModule {}
