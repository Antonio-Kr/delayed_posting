import { Injectable } from '@nestjs/common';
import { IPost } from './interfaces/post.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostService {
  constructor(@InjectModel('Post') private postModel: Model<IPost>) {}

  async createPost(postContent: IPost) {
    const createdPost = this.postModel(postContent);
    return await createdPost.save();
  }

  private createPostDto(postContent: IPost): CreatePostDto {
    return {
      title: postContent.title,
      body: postContent.body,
      templateId: postContent.templateId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}
