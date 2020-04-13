import {
  Controller,
  Post,
  UseInterceptors,
  Body,
  UploadedFile,
  Get,
  Param,
} from '@nestjs/common';
import { PostService } from './post.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { IAttachementRemove } from './interfaces/attachement-remove.interface';
import { IPost } from './interfaces/post.interface';
import { ISchedule } from './interfaces/schedule.interface';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('create')
  async createPost(
    @Body('postContent') postContent: IPost,
    @Body('schedule') schedule,
  ) {
    const createdPost = await this.postService
      .createPost(postContent)
      .toPromise();
    const scheduleContent: ISchedule = {
      notify: schedule.notify,
      postId: createdPost._id,
      providerId: schedule.providerId,
      startsAt: schedule.startsAt,
      status: 'pending',
      userId: schedule.userEmail,
    };
    return this.postService.createSchedule(scheduleContent);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file) {
    return this.postService.uploadFile(file);
  }

  @Post('remove')
  async removeAttachement(@Body() removeContent: IAttachementRemove) {
    return this.postService.removeAttachement(removeContent);
  }

  @Get('providers')
  async getProviders() {
    return await this.postService.getProviders();
  }

  @Get('provider/:id')
  async getProviderById(@Param('id') id: string) {
    return this.postService.getProviderById(id);
  }
}
