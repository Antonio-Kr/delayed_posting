import { Module } from '@nestjs/common';
import { SchedulesModule } from './schedules/schedules.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    SchedulesModule,
    MongooseModule.forRoot('mongodb://localhost/delayed_posting'),
  ],
})
export class AppModule {}
