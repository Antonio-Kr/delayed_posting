import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { FilesService } from './files.service';
import { IAttachementResult } from './interfaces/attachement-result.interface';
import { IUpdateAttachements } from './interfaces/update-attachements.interface';
import { IAttachementRemove } from './interfaces/attachement-remove.interface';

@Controller()
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @MessagePattern('uploadFile')
  async uploadFile(file) {
    return await this.filesService.uploadFile(file);
  }

  @MessagePattern('removeAttachement')
  async removeAttachement(removeContent: IAttachementRemove) {
    return await this.filesService.removeAttachement(removeContent);
  }

  @MessagePattern('updateAttachements')
  async updateAttachements(attachements: IUpdateAttachements) {
    return await this.filesService.updateAttachements(attachements);
  }

  @MessagePattern('attachementsLink')
  async attachementsLink(postId:string){
    return await this.filesService.attachementsLink(postId);
  }
}
