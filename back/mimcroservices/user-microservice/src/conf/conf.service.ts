import { Injectable } from '@nestjs/common';
import { IUser } from './interfaces/users.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersService } from '../users/users.service';
require('dotenv').config();

@Injectable()
export class ConfService{
    constructor(@InjectModel('User') private userModel:Model<IUser>,private usersService: UsersService){}

    async confPassword(email:string){
        let userConfirm:IUser;
        userConfirm=await this.usersService.findOneByEmail(email);

        const {email:emailString, _id:uid, password} = userConfirm;

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
            subject:'Регистрация на сайте ',
            text:'Добро пожаловать!',
            html: `<!DOCTYPE html><html lang="ru"><head> <meta charset="UTF-8"> <title>Title</title>
            </head><body> <h1>Добро пожаловать!</h1> <p>Поздравляем вас с успешной 
            регистрацией на сайте!</p><ul> <li>Ваш логин: <strong>${userConfirm.email}
            </strong></li><li>Ваш пароль: <strong> ${userConfirm.password}</strong></li>
            </ul><p>Ссылка на сайт:<a href='${process.env.HOME_URL}/user/activate?uid=${uid}pass=${password}'>
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