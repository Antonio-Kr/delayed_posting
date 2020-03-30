import { Injectable } from '@nestjs/common';
import { IPost } from './interfaces/post.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePostDto } from './dto/create-post.dto';
import { IProvider } from './interfaces/provider.interface';
import { IPostTemplate } from './interfaces/post-template.interface';

@Injectable()
export class PostService {
  constructor(
    @InjectModel('Post') private postModel: Model<IPost>,
    @InjectModel('SocialProvider')
    private readonly socialProviderModel: Model<IProvider>,
    @InjectModel('PostTemplate')
    private readonly postTemplateModel: Model<IPostTemplate>,
  ) {}

  async createPost(postContent: IPost) {
    const createdPost = this.postModel(postContent);
    return await createdPost.save();
  }

  async getProviders() {
    return this.socialProviderModel.find().exec();
  }

  async getProviderById(id: string) {
    return this.postTemplateModel.findOne({ providerId: id }).exec();
  }
}
