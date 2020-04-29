import {
  Controller,
  Post,
  UseInterceptors,
  Body,
  UploadedFile,
  Get,
  Param,
  Scope,
} from '@nestjs/common';
import { PostService } from './post.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { IAttachementRemove } from './interfaces/attachement-remove.interface';
import { IPost } from './interfaces/post.interface';
import { ISchedule } from './interfaces/schedule.interface';
import { Readable } from 'stream';
import { resolve } from 'dns';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('create')
  async createPost(
    @Body('postContent') postContent: IPost,
    @Body('schedule') schedule,
  ) {
    const createdPost = await this.postService.createPost(postContent);
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
    return await this.postService.uploadFile(file);
  }

  @Post('remove')
  async removeAttachement(@Body() removeContent: IAttachementRemove) {
    return await this.postService.removeAttachement(removeContent);
  }

  @Get('providers')
  async getProviders() {
    return await this.postService.getProviders();
  }

  @Get('provider/:id')
  async getProviderById(@Param('id') id: string) {
    return await this.postService.getProviderById(id);
  }
}
