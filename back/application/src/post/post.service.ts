import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { connectionConstants } from 'src/constants';
import { IAttachementResult } from './interfaces/attachement-result.interface';
import { IPost } from './interfaces/post.interface';
import { IAttachementRemove } from './interfaces/attachement-remove.interface';
import { IProvider } from './interfaces/service-provider.interface';
import { IPostTemplate } from './interfaces/post-template.interface';

@Injectable()
export class PostService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: connectionConstants.host,
        port: connectionConstants.getawayPort,
      },
    });
  }

  async uploadFile(file: any) {
    return await this.client.send<IAttachementResult, string>(
      'uploadFile',
      file,
    );
  }

  async removeAttachement(removeContent: IAttachementRemove) {
    return await this.client.send<any, IAttachementRemove>(
      'removeAttachement',
      removeContent,
    );
  }

  async createPost(postContent: IPost) {
    return await this.client.send<any, IPost>('createPost', postContent);
  }

  async getProviders() {
    const providers = await this.client
      .send<Promise<IProvider[]>, any>('getProviders', '')
      .toPromise();

    return providers.map(
      (provider): IProvider => {
        return {
          id: provider['_id'],
          name: provider.name,
          logoLink: provider.logoLink,
        };
      },
    );
  }

  async getProviderById(id: string) {
    return await this.client.send<IPostTemplate, string>('getProviderById', id);
  }
}
