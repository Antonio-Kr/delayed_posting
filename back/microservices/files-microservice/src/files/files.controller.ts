import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @MessagePattern('uploadFile')
  async uploadFile(file) {
    return await this.filesService.uploadFile(file).catch();
  }
}
