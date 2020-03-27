import { Module } from '@nestjs/common';
import { TokenModule } from './token/token.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    TokenModule,
    MongooseModule.forRoot('mongodb://localhost/delayed_posting'),
  ],
})
export class AppModule {}
