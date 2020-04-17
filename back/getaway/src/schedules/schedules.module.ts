import { Module } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { SchedulesController } from './schedules.controller';
import { PostService } from 'src/post/post.service';
import { FilesService } from 'src/files/files.service';

@Module({
  providers: [SchedulesService, PostService, FilesService],
  controllers: [SchedulesController],
})
export class SchedulesModule {}
