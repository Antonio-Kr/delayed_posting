import { Module } from '@nestjs/common';
import { FilesModule } from './files/files.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    FilesModule,
    MongooseModule.forRoot('mongodb://localhost/delayed_posting'),
  ],
})
export class AppModule {}
