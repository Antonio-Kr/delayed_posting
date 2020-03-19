import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { connectionConstants } from 'src/constants';
import { IAttachementResult } from './interfaces/attachement-result.interface';
import { IPost } from './interfaces/post.interface';

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

  async createPost(postContent: IPost) {
    return await this.client.send<any, IPost>('createPost', postContent);
  }
}
