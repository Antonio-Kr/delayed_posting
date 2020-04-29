import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { connectionConstants } from 'src/constants';
import { IPost } from './interfaces/post.interface';
import { IProvider } from './interfaces/provider.interface';
import { IPostTemplate } from './interfaces/post-template.interface';

@Injectable()
export class PostService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: connectionConstants.host,
        port: connectionConstants.postMicroservicePort,
      },
    });
  }

  async createPost(postContent: IPost) {
    return await this.client.send<any, IPost>('createPost', postContent);
  }

  async removePost(postId: string) {
    return await this.client.send<any, string>('removePost', postId);
  }

  async getPostById(postId: string) {
    return await this.client.send<IPost, string>('getPostById', postId);
  }

  async getProviders() {
    return await this.client.send<Promise<IProvider[]>, any>(
      'getProviders',
      '',
    );
  }

  async getProviderById(id: string) {
    return await this.client.send<IPostTemplate, string>('getProviderById', id);
  }

  async getProviderNameById(providerId) {
    return this.client
      .send<any, any>('getProviderNameById', providerId)
      .toPromise();
  }
}
