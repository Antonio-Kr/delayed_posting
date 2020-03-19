import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AttachementSchema } from './schemas/attachement.schema';

@Module({
  providers: [FilesService],
  controllers: [FilesController],
  imports: [
    MongooseModule.forFeature([
      { name: 'Attachement', schema: AttachementSchema },
    ]),
  ],
})
export class FilesModule {}
