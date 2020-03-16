import { Controller, Post, Body } from '@nestjs/common';
import { ForgService } from './forg.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class ForgController{
    constructor(private forgService: ForgService){}

    @MessagePattern('forgotPassword')
    async forgot(email:string){
        return await this.forgService.forgotPassword(email);
    }
}