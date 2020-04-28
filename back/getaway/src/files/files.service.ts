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
import * as stream from 'stream';

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

  async uploadFile(data) {
    return await this.client
      .send<IAttachementResult, any>('uploadFile', data)
      .toPromise();
  }

  async removeAttachement(removeContent: IAttachementRemove) {
    return await this.client
      .send<any, IAttachementRemove>('removeAttachement', removeContent)
      .toPromise();
  }

  async updateAttachements(updateAttachements: IUpdateAttachements) {
    return await this.client
      .send<any, IUpdateAttachements>('updateAttachements', updateAttachements)
      .toPromise();
  }
}
