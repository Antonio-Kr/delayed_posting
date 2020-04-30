import { Injectable } from '@nestjs/common';
import { IPost } from './interfaces/post.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePostDto } from './dto/create-post.dto';
import { IPostTemplate } from 'src/interfaces/post-template.interface';
import { ISocialProvider } from 'src/interfaces/social-provider.interface';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { connectionConstants } from 'src/constants';

@Injectable()
export class PostService {
  private client:ClientProxy;
  constructor(
    @InjectModel('Post') private postModel: Model<IPost>,
    @InjectModel('SocialProvider')
    private readonly socialProviderModel: Model<ISocialProvider>,
    @InjectModel('PostTemplate')
    private readonly postTemplateModel: Model<IPostTemplate>,
  ) {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: connectionConstants.host,
        port: connectionConstants.schedulesMicroservicePort,
      },
    });
  }

  async createPost(postContent: IPost) {
    const createdPost = this.postModel(postContent);
    this.client.send<any,any>('restartSchedule',0).toPromise();
    return await createdPost.save();
  }

  async removePost(postId: string) {
    return await this.postModel.findByIdAndRemove(postId).exec();
  }

  async getPostById(postId: string) {
    return await this.postModel.find({ _id: postId }).exec();
  }

  async getProviders() {
    return this.socialProviderModel.find().exec();
  }

  async getProviderById(id: string) {
    return this.postTemplateModel.findOne({ providerId: id }).exec();
  }

  async getPostTitle(postId:string){
    let getPost:IPost = await this.postModel.findOne({'_id':postId});
    return getPost.title;
  }

  async getPostBody(postId:string){
    let getPost:IPost = await this.postModel.findOne({'_id':postId});
    return getPost.body;
  }

  async getProviderNameById(providerId) {
    return this.socialProviderModel.findById(providerId).exec();
  }
}
