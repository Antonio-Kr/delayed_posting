import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from './interfaces/users.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { IJwtToken } from './interfaces/jwt-token.interface';
import { sha512 } from 'js-sha512'
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { IUserUpdate } from './interfaces/user-update.interface';

@Injectable()
export class UsersService {
  private client : ClientProxy;
  constructor(@InjectModel('User') private userModel: Model<IUser>) {
    this.client = ClientProxyFactory.create({
    transport: Transport.TCP,
    options: {
      host: '127.0.0.1',
      port: 8879,
    },
  });
  const cloudinary = require('cloudinary');
  const dotenv = require('dotenv');
  dotenv.config();
  cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
}

  async create(createUserDto: CreateUserDto): Promise<IUser> {
    let createdUser = new this.userModel(createUserDto);
    let userThis:IUser;
    
    userThis = await createdUser.save().catch(result => this.getErrors(result));
    let x = await this.userModel.update({_id:userThis._id}, {$set:{"registerOk":'pending'}});

    let tokenCheck = await this.sendToken(userThis.email);

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
      to: userThis.email,
      subject:'Регистрация на сайте ',
      text:'Добро пожаловать!',
      html: `<!DOCTYPE html><html lang="ru"><head> <meta charset="UTF-8"> <title>Title</title>
      </head><body> <h1>Добро пожаловать!</h1> <p>Поздравляем вас с успешной 
      регистрацией на сайте!</p><ul> <li>Ваш логин: <strong>${createUserDto.email}
      </strong></li><li>Ваш пароль: <strong> ${createUserDto.password}</strong></li>
      </ul><p>Ссылка для потверждения почты:<a href='http://localhost:3000/user/token?token=${tokenCheck.token}&email=${tokenCheck.email}'>
      Здесь</a></p></body></html>`
    }
    let result = transport.sendMail(Options, function(error, response){
      if(error){
        console.log(error);
      }else{
        console.log("Message sent: OK");
    }});

    return await userThis;
  }

  async sendToken(email:string){
    return await this.client.send<Promise<IJwtToken>, string>('tokenRegister', email).toPromise();
  }

  async findOneByEmail(email): Promise<IUser> {
    let x = await this.userModel.findOne({ email: email });
    console.log(email, x);
    return x;
  }

  async forgotPassword(email: string) {
    let userForgot:IUser;
    let a = Math.random().toString(36).slice(2,10);
    
    console.log('randomPass:', a);
    userForgot=await this.findOneByEmail(email);
    
    const res = await this.userModel.update({_id:userForgot._id}, {$set:{"password":sha512(a)}});

    userForgot=await this.findOneByEmail(email);

    const {email:emailString} = userForgot;
        
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
      text:'Здравствуйте!',
      html: `<!DOCTYPE html><html lang="ru"><head> <meta charset="UTF-8"> <title>Title</title>
            </head><body> <h1>Здравствуйте!</h1> <p>Ваш пароль был сброшен!</p>Вот ваш временный пароль для входа: <strong>${a}
            </strong><p>Пожалуйста измените свой пароль в профиле. Ссылка на сайт:<a href='http://localhost:3000'>
            Здесь</a></p></body></html>`
      }

      let result = transport.sendMail(Options, function(error, response){
        if(error){
          console.log(error);
        }else{
          console.log("Message sent: OK");
      }});    

    return await this.userModel.findOne({ email: email });
  }

  async registerOk(user:IUser){
    return await this.userModel.update({_id:user._id}, {$set:{"registerOk":'active'}});
  }

  async userUpdate(userUpdate:IUser, token:any){
    let user = await this.findOneByEmail(userUpdate.email);
    if(!userUpdate.firstName){
      userUpdate.firstName = user.firstName;
    }
    if(!userUpdate.lastName){
      userUpdate.lastName = user.lastName;
    }
    if(!userUpdate.password){
      userUpdate.password = user.password;
    }
    if(!userUpdate.timezone){
      userUpdate.timezone = user.timezone;
    }
    if(!userUpdate.avatar){
      userUpdate.avatar = user.avatar;
    }
    if(!userUpdate.avatarId){
      userUpdate.avatarId = user.avatarId;
    }
    await this.userModel.update({email:user.email},
       {$set:{"firstName":userUpdate.firstName, 
              "lastName":userUpdate.lastName,
              "timezone":userUpdate.timezone}});
    return await this.findOneByEmail(userUpdate.email);
  }

  async passwordUpdate(passwordUpdate:IUserUpdate){
    let user:IUser = await this.findOneByEmail(passwordUpdate.email);
    if(user.password===sha512(passwordUpdate.password)){
      await this.userModel.update({email:user.email}, {$set:{"password":sha512(passwordUpdate.newPassword)}});
      user = await this.findOneByEmail(passwordUpdate.email);
      return user;
    }
    return 'Старый пароль не совпадает!!!';
  }

  async avatarUpdate(avatarUpdate:IUserUpdate){
    //avatar Update
  }

  async avatarDelete(avatarDelete:IUserUpdate){
    //avatar Delete
  }

  private getErrors(result) {
    let errors = [];

    if (result.name == 'MongoError') {
      errors.push({
        type: 'duplicate',
        path: 'email',
      });
    }

    for (const key in result.errors) {
      if (result.errors.hasOwnProperty(key)) {
        const element = result.errors[key]['properties'];

        errors.push({
          type: element.type,
          path: element.path,
        });
      }
    }

    return errors;
  }
}
