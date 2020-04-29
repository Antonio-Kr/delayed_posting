import { Module } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { SchedulesController } from './schedules.controller';
import { PostService } from 'src/post/post.service';
import { FilesService } from 'src/files/files.service';
import { SocialConnectionsService } from 'src/social-connections/social-connections.service';

@Module({
  providers: [
    SchedulesService,
    PostService,
    FilesService,
    SocialConnectionsService,
  ],
  controllers: [SchedulesController],
})
export class SchedulesModule {}
