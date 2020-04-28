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
import { ISchedule } from './interfaces/schedule.interface';
import { Readable } from 'stream';
import { v4 as uuidv4 } from 'uuid';

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

  async uploadFile(file) {
    let data = file.buffer;
    const rstream = new Readable({
      autoDestroy: true,
      read(size) {
        let wantMore = true;
        while (wantMore) {
          const chunk = data.slice(0, size);
          if (!chunk || chunk.length == 0) {
            this.emit('end');
            return this.push(null);
          }
          wantMore = this.push(chunk);
          data = data.slice(size);
        }
      },
    });
    return await this.asyncReadable(rstream);
  }
  async asyncReadable(readable: Readable) {
    let uuid = uuidv4();

    for await (const chunk of readable) {
      let streamData = {
        uuid,
        chunk,
      };
      // console.log(streamData);

      await this.client
        .send<IAttachementResult, any>('uploadFile', streamData)
        .toPromise();
    }
    return await this.client
      .send<IAttachementResult, any>('uploadFile', {
        uuid,
      })
      .toPromise();
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

  async createSchedule(scheduleContent: ISchedule) {
    return await this.client.send<any, ISchedule>(
      'createSchedule',
      scheduleContent,
    );
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
