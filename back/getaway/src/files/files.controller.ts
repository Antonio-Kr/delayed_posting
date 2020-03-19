import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
  constructor(private readonly fileService: FilesService) {}

  @MessagePattern('uploadFile')
  async uploadFile(file) {
    return await this.fileService.uploadFile(file);
  }
}
