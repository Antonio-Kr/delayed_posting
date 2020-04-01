import { Module } from '@nestjs/common';
import { PostModule } from './post/post.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SeederModule } from './seeder/seeder.module';

@Module({
  imports: [
    PostModule,
    MongooseModule.forRoot('mongodb://localhost/delayed_posting'),
    SeederModule,
  ],
})
export class AppModule {}
