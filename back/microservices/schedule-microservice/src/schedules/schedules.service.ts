import { Injectable } from '@nestjs/common';
import { ISchedule } from './interfaces/schedule.interface';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { connectionConstants } from 'src/constants';
import { IUser } from './interfaces/users.interface';
import { SchedulerRegistry } from '@nestjs/schedule';
const CronJob = require('cron').CronJob;
const cron = require('node-cron');
let nodeSchedule = require('node-schedule');
const fetch = require("node-fetch");

@Injectable()
export class SchedulesService {
  private client: ClientProxy;

  constructor(
    @InjectModel('Schedule')
    private scheduleModel: Model<ISchedule>, private schedulerRegistry:SchedulerRegistry,
  ) {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: connectionConstants.host,
        port: connectionConstants.userMicroservicePort,
      },
    });
    this.Cronspending();
  }

  async createSchedule(scheduleContent: CreateScheduleDto): Promise<ISchedule> {
    scheduleContent.userId = await this.client
      .send<IUser, string>('findOneByEmail', scheduleContent.userId)
      .toPromise()
      .then(user => user._id);

    const createdSchedule = new this.scheduleModel(scheduleContent);
    return await createdSchedule.save();
  }

  async Cronspending(){
    let scheduleMass:ISchedule[] = await this.scheduleModel.find({"status":"pending"});
    for(let i =0;i<scheduleMass.length;i++){
      const dataTime = Date.parse(scheduleMass[i].startsAt);
      const data:Date = new Date(dataTime);
      const now = new Date();
      let attachementsLink = new Array();
      let postTitle = new Array();
      let postBody = new Array();
      let token = new Array();
      let personId = new Array();
      let bodyPost = new Array();
      let scheduleDate = data.getUTCSeconds()+' '+data.getUTCMinutes()+' '+data.getUTCHours()+' '+data.getUTCDate()+' '+(data.getUTCMonth()+1)+' '+data.getUTCDay();
      attachementsLink[i] = await this.getAttachements(scheduleMass[i].postId);
      postTitle[i] = await this.getPostTitle(scheduleMass[i].postId);
      postBody[i] = await this.getPostBody(scheduleMass[i].postId);
      token[i] = await this.getToken(scheduleMass[i].userId);
      personId[i] = await this.getPersonId(token[i]);
      bodyPost[i] = {
        content: {
          contentEntities: [
            {
              entityLocation: attachementsLink[i], //"<взять из таблицы attachements поле link >",
            },
          ],
          title: postTitle[i],  //"<взять из таблицы Posts поле title>",
        },
        text: {
          text: postBody[i], //"<взять из таблицы Posts поле body>",
        },
        subject: "",
        distribution: {
          linkedInDistributionTarget: {},
        },
        owner: "urn:li:person:"+personId[i], 
       
        // пример: owner: "urn:li:person:U-r35lHEv_",
        // ты его должен получить прямо из linkedIn
        // ты получаешь полный объект юзера 
        // application/src/social-connections/social-connections.controller.ts 
        // 46 строка; посмотри какой запрос посылать
      };
      
      let scheduls = nodeSchedule.scheduleJob(scheduleDate, async function(){
        console.log('Schedules:', scheduleDate, ', прошел успешно');
        // let a = await 
        //let a = await this.scheduleModel.updateOne({"_id":scheduleMass[i]._id}, {$set:{"status":"post sent"}});
        // console.log('A:',a);
        
        await fetch("https://api.linkedin.com/v2/shares", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token[i]}`,
          "Content-Type": "application/json",
          "x-li-format": "json",
        },
        body: JSON.stringify(bodyPost[i]),
        })
        .then((response) => response.json())
        .then(console.log)
        .catch(console.log);
      });
    }
  }

  async schedulePosting(){
    
  }

  async startSchedule(postId:string){
    console.log('startSchedule')
    return await this.client.send<string, string>('startSchedule',postId);
  }

  async getPostTitle(postId:string){
    return await this.client.send<string, string>('getPostTitle', postId);
  }

  async getPostBody(postId:string){
    return await this.client.send<string, string>('getPostBody', postId);
  }

  async getAttachements(postId:string){
    return await this.client.send<string, string>('attachementsLink',postId);
  }

  async getToken(userId:string){
    return await this.client.send<string, string>('getToken', userId);
  }

  async getPersonId(token:any){
    let personId = await fetch(
      'https://api.linkedin.com/v2/me?projection=(id,firstName,lastName,profilePicture(displayImage~:playableStreams))',
      {
        headers: {
          Connection: 'Keep-Alive',
          Authorization: `Bearer ${token}`,
        },
      },
    ).then(response => response.json());
  }
}