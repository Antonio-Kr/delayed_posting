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

  @MessagePattern('getProviders')
  async getProviders() {
    return await this.postService.getProviders();
  }

  @MessagePattern('getProviderById')
  async getProviderById(id: string) {
    return this.postService.getProviderById(id);
  }

  @MessagePattern('getPostTitle')
  async getPostTitle(postId:string){
    return this.postService.getPostTitle(postId);
  }

  @MessagePattern('getPostBody')
  async getPostBody(postId:string){
    return this.postService.getPostBody(postId);
  }
}
