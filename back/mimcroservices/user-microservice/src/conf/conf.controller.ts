import { Controller, Post, Body } from '@nestjs/common';
import { ConfService } from './conf.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class ConfController{
    constructor(private confService: ConfService){}

    @MessagePattern('confirmPassword')
    async confirm(email:string){
        return await this.confService.confPassword(email);
    }
}