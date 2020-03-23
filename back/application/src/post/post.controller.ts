import {
  Controller,
  Post,
  UseInterceptors,
  Body,
  UploadedFile,
} from '@nestjs/common';
import { PostService } from './post.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { IPost } from './interfaces/post.interface';
import { IAttachementResult } from './interfaces/attachement-result.interface';
import { IAttachementRemove } from './interfaces/attachement-remove.interface';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('create')
  async createPost(@Body() postContent: IPost) {
    return await this.postService.createPost(postContent);
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
}
