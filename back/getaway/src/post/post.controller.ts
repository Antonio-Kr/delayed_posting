import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { PostService } from './post.service';
import { IPost } from './interfaces/post.interface';
import { FilesService } from 'src/files/files.service';

@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly fileService: FilesService,
  ) {}

  @MessagePattern('createPost')
  async createPost(postContent: IPost) {
    const createdPost = await this.postService
      .createPost(postContent)
      .toPromise();
    await this.fileService.updateAttachements({
      attachements: postContent.attachements,
      postId: createdPost['_id'],
    });
    return await createdPost;
  }

  @MessagePattern('getProviders')
  async getProviders() {
    return this.postService.getProviders();
  }

  @MessagePattern('getProviderById')
  async getProviderById(id: string) {
    return this.postService.getProviderById(id);
  }
}
