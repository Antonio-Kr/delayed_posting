import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ForgModule } from './forg/forg.module';
import { ConfModule } from './conf/conf.module';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot('mongodb://localhost/delayed_posting'),
    AuthModule,
    ForgModule,
    ConfModule,
  ],
})
export class AppModule {}
