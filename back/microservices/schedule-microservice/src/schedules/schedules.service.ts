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
import { response } from 'express';
import { async } from 'rxjs/internal/scheduler/async';
const CronJob = require('cron').CronJob;
const cron = require('node-cron');
let nodeSchedule = require('node-schedule');
const fetch = require("node-fetch");

@Injectable()
export class SchedulesService {
  private client: ClientProxy;
  private clientPost: ClientProxy;
  private clientUser: ClientProxy;
  private clientSocial: ClientProxy;
  public scheduleStart;

  constructor(
    @InjectModel('Schedule')
    private scheduleModel: Model<ISchedule>, private schedulerRegistry:SchedulerRegistry,
  ) {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: connectionConstants.host,
        port: connectionConstants.filesMicroservicePort,
      },
    });
    this.clientPost = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: connectionConstants.host,
        port: connectionConstants.postMicroservicePort,
      },
    });
    this.clientSocial = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: connectionConstants.host,
        port: connectionConstants.socialProvidersPort,
      },
    });
    this.clientUser = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: connectionConstants.host,
        port: connectionConstants.userMicroservicePort,
      },
    });
    this.Cronspending();
  }

  async createSchedule(scheduleContent: CreateScheduleDto): Promise<ISchedule> {
    scheduleContent.userId = await this.clientUser
      .send<IUser, string>('findOneByEmail', scheduleContent.userId)
      .toPromise()
      .then(user => user._id);

    const createdSchedule = new this.scheduleModel(scheduleContent);
    return await createdSchedule.save();
  }

  async Cronspending(restart?:string){
    let scheduls;
    let scheduleMass:ISchedule[] = await this.scheduleModel.find({"status":"pending"});
    const now = new Date();
    let attachementsLink = new Array();
    let postTitle = new Array();
    let postBody = new Array();
    let token = new Array();
    let personId = new Array();
    let bodyPost = new Array();
    for(let i =0;i<scheduleMass.length;i++){
      
      const dataTime = Date.parse(scheduleMass[i].startsAt);
      const data:Date = new Date(dataTime);
      
      let scheduleDate = data.getUTCSeconds()+' '+data.getUTCMinutes()+' '+data.getUTCHours()+' '+data.getUTCDate()+' '+(data.getUTCMonth()+1)+' '+data.getUTCDay();
      attachementsLink[i] = await this.getAttachements(scheduleMass[i].postId);
      postTitle[i] = await this.getPostTitle(scheduleMass[i].postId);
      postBody[i] = await this.getPostBody(scheduleMass[i].postId);
      token[i] = await this.getToken(scheduleMass[i].userId);
      personId[i] = await this.getPersonId(token[i]);
      if(attachementsLink[i]===null){
        attachementsLink[i]='[]';
      }
      if(postTitle[i]===null){
        postTitle[i]='[]';
      }
      if(postBody[i]===null){
        postBody[i]='[]';
      }
      bodyPost[i] = {
        content: {
          contentEntities: [
            {
              entityLocation: attachementsLink[i], 
            },
          ],
          title: postTitle[i], 
        },
        text: {
          text: postBody[i],
        },
        subject: "",
        distribution: {
          linkedInDistributionTarget: {},
        },
        owner: "urn:li:person:"+personId[i], 
      };
      
      scheduls = nodeSchedule.scheduleJob(scheduleDate, async() =>{
        console.log('Schedules:', scheduleDate, ', прошел успешно');
        let a = await this.scheduleModel.updateOne({"_id":scheduleMass[i]._id}, {$set:{"status":"post sent"}});
        
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
    if(restart=='restart'){
      scheduls.cancel();
      this.Cronspending();
    }
  }

  async startSchedule(){
    console.log('startSchedule')
    return this.Cronspending('restart');
  }

  async getPostTitle(postId:string){
    return await this.clientPost.send<string, string>('getPostTitle', postId).toPromise();
  }

  async getPostBody(postId:string){
    return await this.clientPost.send<string, string>('getPostBody', postId).toPromise();
  }

  async getAttachements(postId:string){
    return await this.client.send<string, string>('attachementsLink',postId).toPromise();
  }

  async getToken(userId:string){
    return await this.clientSocial.send<string, string>('getToken', userId).toPromise();
  }

  async getPersonId(token:any){
    const personId = await fetch(
      'https://api.linkedin.com/v2/me?projection=(id,firstName,lastName,profilePicture(displayImage~:playableStreams))',
      {
        headers: {
          Connection: 'Keep-Alive',
          Authorization: `Bearer ${token}`,
        },
      },
    ).then(response => response.json());
      return personId.id;
  }
}