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

  uploadFile(file) {
    return this.client.send<IAttachementResult, string>('uploadFile', file);
  }

  removeAttachement(removeContent: IAttachementRemove) {
    return this.client.send<any, IAttachementRemove>(
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
