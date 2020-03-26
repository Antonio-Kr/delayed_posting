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
import { IAttachementResult } from './interfaces/attachement-result.interface';
import { IAttachementRemove } from './interfaces/attachement-remove.interface';
import { IProvider } from './interfaces/service-provider.interface';
import { IPostTemplate } from './interfaces/post-template.interface';
import { IPost } from './interfaces/post.interface';

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

  @Get('providers')
  async getProviders() {
    return await this.postService.getProviders();
  }

  @Get('provider/:id')
  async getProviderById(@Param('id') id: string) {
    return await this.postService.getProviderById(id);
  }
}
