import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { PostService } from './post.service';
import { IPost } from './interfaces/post.interface';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @MessagePattern('createPost')
  async createPost(postContent: IPost) {
    return await this.postService.createPost(postContent);
  }
}
