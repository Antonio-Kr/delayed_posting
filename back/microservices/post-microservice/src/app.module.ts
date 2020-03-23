import { Module } from '@nestjs/common';
import { PostModule } from './post/post.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    PostModule,
    MongooseModule.forRoot('mongodb://localhost/delayed_posting'),
  ],
})
export class AppModule {}
