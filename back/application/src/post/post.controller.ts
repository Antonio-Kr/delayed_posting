import {
  Controller,
  Post,
  UseInterceptors,
  Body,
  UploadedFile,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { PostService } from './post.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { IAttachementResult } from './interfaces/attachement-result.interface';
import { IAttachementRemove } from './interfaces/attachement-remove.interface';
import { IProvider } from './interfaces/service-provider.interface';
import { IPostTemplate } from './interfaces/post-template.interface';
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
    const createdPost = await (
      await this.postService.createPost(postContent)
    ).toPromise();
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

  @Get('all/togo')
  async getAllPostsToGo(
    @Query('email') email: string,
    @Query('dateTime') dateTime: Date,
  ) {
    let params = { email, dateTime };
    return await this.postService.getAllPostsToGo(params);
  }

  @Get('all/range')
  async getAllPostsDateRange(
    @Query('email') email: string,
    @Query('from') from: Date,
    @Query('to') to: Date,
  ) {
    let params = { email, from, to };
    return await this.postService.getAllPostsDateRange(params);
  }

  @Get('all/arch')
  async getAllPostsArchive(
    @Query('email') email: string,
    @Query('dateTime') dateTime: Date,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    let params = { email, dateTime, page, limit };
    return await this.postService.getAllPostsArch(params);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file) {
    return await this.postService.uploadFile(file);
  }

  @Post('remove/attachement')
  async removeAttachement(@Body() removeContent: IAttachementRemove) {
    return await this.postService.removeAttachement(removeContent);
  }

  @Post('remove')
  async removePost(@Body() scheduleId) {
    return await this.postService.removePost(scheduleId.scheduleId);
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
