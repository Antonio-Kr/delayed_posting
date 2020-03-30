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
const dotenv = require('dotenv');
const result = dotenv.config();
if (result.error) {
  throw result.error
}
console.log(result.parsed);
const cloudinary = require('cloudinary');
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

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
        user: process.env.LOGIN_EMAIL,
        pass: process.env.PASSWORD_EMAIL
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
      </ul><p>Ссылка для потверждения почты:<a href='${process.env.HOME_PAGE}/user/token?token=${tokenCheck.token}&email=${tokenCheck.email}'>
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
    return x;
  }

  async findInfoFromUser(email){
    let user = await this.userModel.findOne({ email: email });
    const{firstName, lastName, timezone, registerOk, avatar, avatarId, ...res}= user;
    let x={
      registerOk:registerOk,
      firstName:firstName,
      lastName:lastName,
      timezone:timezone,
      avatar:avatar,
      avatarId:avatarId}
    return x;
  }

  async forgotPassword(email: string) {
    let userForgot:IUser;
    let a = Math.random().toString(36).slice(2,10);
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
        user: process.env.LOGIN_EMAIL,
        pass: process.env.PASSWORD_EMAIL
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
            </strong><p>Пожалуйста измените свой пароль в профиле. Ссылка на сайт:<a href='${process.env.HOME_PAGE}'>
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

  async tokenCkeck(email:string){
    return await this.client.send<Promise<IJwtToken>, string>('tokenCheck', email).toPromise();
  }

  async userUpdate(email:string, firstName:string, lastName:string, timezone:string, token:any){
    let tokenCheck = await this.sendToken(email);
    if(tokenCheck==null) {
      return 'error';
    }
    let user = await this.findOneByEmail(email);
    if(!firstName){
      firstName = user.firstName;
    }
    if(!lastName){
      lastName = user.lastName;
    }
    if(!timezone){
      timezone = user.timezone;
    }
    await this.userModel.update({email:user.email}, {$set:{"firstName":firstName, "lastName":lastName, "timezone":timezone}});
    return await this.findOneByEmail(email);
  }

  async passwordUpdate(passwordUpdate:IUserUpdate, token:any){
    let tokenCheck = await this.sendToken(token.email);
    if(tokenCheck==null) {
      return 'error';
    }
    let user:IUser = await this.findOneByEmail(passwordUpdate.email);
    if(user.password===sha512(passwordUpdate.password)){
      await this.userModel.update({email:user.email}, {$set:{"password":sha512(passwordUpdate.newPassword)}});
      user = await this.findOneByEmail(passwordUpdate.email);
      return tokenCheck;
    }
    return {"error": "password not match"};
  }

  async avatarUpdate(avatarUpdate:IUserUpdate, token:any){
    let tokenCheck = await this.sendToken(token.email);
    if(tokenCheck==null) {
      return 'error';
    }
    let res = await cloudinary.v2.uploader.upload(avatarUpdate.avatar,function(error, result) {console.log(result, error); });
    await this.userModel.update({email:avatarUpdate.email}, {$set:{"avatar":res.url, "avatarId":res.public_id}});
    let user = await this.findOneByEmail(avatarUpdate.email);
    return user.avatar;
  }

  async avatarDelete(avatarDelete:IUserUpdate, token:any){
    let tokenCheck = await this.sendToken(token.email);
    if(tokenCheck==null) {
      return 'error';
    }
    await this.userModel.update({email:avatarDelete.email}, {$set:{"avatar":"", "avatarId":""}});
    return await this.findOneByEmail(avatarDelete.email);
  }

  async userDelete(email:string){
    let userDelete = await this.userModel.remove({email:email});
    if(userDelete.nRemoved==1){
      return {ok:true};
    }
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
