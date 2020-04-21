import { Injectable } from '@nestjs/common';
import { IPost } from './interfaces/post.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePostDto } from './dto/create-post.dto';
import { IPostTemplate } from 'src/interfaces/post-template.interface';
import { ISocialProvider } from 'src/interfaces/social-provider.interface';

@Injectable()
export class PostService {
  constructor(
    @InjectModel('Post') private postModel: Model<IPost>,
    @InjectModel('SocialProvider')
    private readonly socialProviderModel: Model<ISocialProvider>,
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

  async getPostTitle(postId:string){
    let getPost:IPost = await this.postModel.find({'_id':postId});
    return getPost.title;
  }

  async getPostBody(postId:string){
    let getPost:IPost = await this.postModel.find({'_id':postId});
    return getPost.body;
  }
}
