import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { connectionConstants } from 'src/constants';
import { IAttachementResult } from './interfaces/attachement-result.interface';
import { IUpdateAttachements } from 'src/post/interfaces/update-attachements.interface';
import { IAttachementRemove } from './interfaces/attachement-remove.interface';

@Injectable()
export class FilesService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: connectionConstants.host,
        port: connectionConstants.filesMicroservicePort,
      },
    });
  }

  async uploadFile(file: any) {
    return await this.client.send<IAttachementResult, string>(
      'uploadFile',
      file,
    );
  }

  async getAttachementsByPostId(postId: string) {
    return await this.client
      .send<IAttachementResult[], string>('getAttachementsByPostId', postId)
      .toPromise();
  }

  async removeAttachementsByPostId(postId: string) {
    return await this.client.send<any, string>(
      'removeAttachementsByPostId',
      postId,
    );
  }

  async removeAttachement(removeContent: IAttachementRemove) {
    return await this.client.send<any, IAttachementRemove>(
      'removeAttachement',
      removeContent,
    );
  }

  async updateAttachements(updateAttachements: IUpdateAttachements) {
    return await this.client
      .send<any, IUpdateAttachements>('updateAttachements', updateAttachements)
      .toPromise();
  }
}
