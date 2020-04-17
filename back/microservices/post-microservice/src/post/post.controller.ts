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

  @MessagePattern('removePost')
  async removePost(postId: string) {
    return await this.postService.removePost(postId);
  }

  @MessagePattern('getPostById')
  async getPostById(postId: string) {
    return await this.postService.getPostById(postId);
  }

  @MessagePattern('getProviders')
  async getProviders() {
    return await this.postService.getProviders();
  }

  @MessagePattern('getProviderById')
  async getProviderById(id: string) {
    return this.postService.getProviderById(id);
  }

  @MessagePattern('getProviderNameById')
  async getProviderNameById(providerId) {
    return await this.postService.getProviderNameById(providerId);
  }
}
