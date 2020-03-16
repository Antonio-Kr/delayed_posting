import { Module } from '@nestjs/common';
import { ConfService } from './conf.service';
import { ConfController } from './conf.controller';
import { UserSchema } from './schemas/users.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module'

@Module({
    imports:[
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
        PassportModule.register({ defaultStrategy: 'jwt', session: false }),
        UsersModule,
    ],
    controllers:[ConfController],
    providers:[ConfService],
})
export class ConfModule{}