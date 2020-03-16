import { Injectable } from '@nestjs/common';
import { IUser } from './interfaces/users.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersService } from '../users/users.service';
require('dotenv').config();


@Injectable()
export class ForgService{
    constructor(@InjectModel('User') private userModel:Model<IUser>,private usersService: UsersService){}

    async forgotPassword(email:string){
        let userForgot:IUser;
        let a = Math.random().toString(36).slice(2,10);
        
        console.log('randomPass:',a);
        userForgot=await this.usersService.findOneByEmail(email);

        console.log(userForgot._id);
        console.log('One',userForgot.password);

        const res = await this.userModel.update({_id:userForgot._id}, {$set:{"password":a}});

        console.log(`результат`,res);
        userForgot=await this.usersService.findOneByEmail(email);

        const {email:emailString, _id:uid, password} = userForgot;
        console.log('Two',password);
        
        let nodemailer = require('nodemailer');
        
        let mailOptions ={
            service:'gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth:{
                user: 'wlad.scheludko@gmail.com',
                pass: 'Wlad1999033'
            }
        }
        let transport = nodemailer.createTransport(mailOptions);
        
        let Options = {
            from: 'user@gmail.com',
            to: emailString,
            subject:'Изменение пароля ',
            text:'Добро пожаловать!',
            html: `<!DOCTYPE html><html lang="ru"><head> <meta charset="UTF-8"> <title>Title</title>
            </head><body> <h1>Здравствуйте!</h1> <p>Ваш пароль был сброшен!</p>Вот ваш временный пароль для входа: <strong>${userForgot.password}
            </strong><p>Пожалуйста измените свой пароль в профиле. Ссылка на сайт:<a href='${process.env.HOME_URL}'>
            Здесь</a></p></body></html>`
        }
        let result = transport.sendMail(Options, function(error, response){
            if(error){
                console.log(error);
            }else{
                console.log("Message sent: OK");
        }});
        
        return await this.usersService.findOneByEmail(email);
    }

}