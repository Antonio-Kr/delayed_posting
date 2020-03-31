import { Module } from '@nestjs/common';
import { SocialConnectionsModule } from './social-connections/social-connections.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    SocialConnectionsModule,
    MongooseModule.forRoot('mongodb://localhost/delayed_posting'),
  ],
})
export class AppModule {}
