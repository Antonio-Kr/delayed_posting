import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { FilesService } from './files.service';
import { IAttachementResult } from './interfaces/attachement-result.interface';
import { IAttachementRemove } from './interfaces/attachement-remove.interface';

@Controller('files')
export class FilesController {
  constructor(private readonly fileService: FilesService) {}

  @MessagePattern('uploadFile')
  async uploadFile(file) {
    return await this.fileService.uploadFile(file);
  }

  @MessagePattern('removeAttachement')
  async removeAttachement(removeContent: IAttachementRemove) {
    return await this.fileService.removeAttachement(removeContent);
  }
}