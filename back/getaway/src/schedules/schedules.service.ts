import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { connectionConstants } from 'src/constants';
import { ISchedule } from './interfaces/schedule.interface';
import { IUser } from '../user/interfaces/user.interface';
import { PostService } from 'src/post/post.service';
import { FilesService } from 'src/files/files.service';
import { SocialConnectionsService } from 'src/social-connections/social-connections.service';
import { IPostTogo } from './interfaces/post-togo.interface';
import { IPostRange } from './interfaces/post-range.interface';
import { IPostArchive } from './interfaces/post-archive.interface';

@Injectable()
export class SchedulesService {
  private client: ClientProxy;

  constructor(
    private readonly postService: PostService,
    private readonly fileService: FilesService,
    private readonly socialConnectionService: SocialConnectionsService,
  ) {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: connectionConstants.host,
        port: connectionConstants.schedulesMicroservicePort,
      },
    });
  }

  async createSchedule(scheduleContent: ISchedule) {
    return await this.client.send<any, ISchedule>(
      'createSchedule',
      scheduleContent,
    );
  }

  async removePost(scheduleId: string) {
    let removedSchedule = await this.client
      .send<any, string>('removeSchedule', scheduleId)
      .toPromise();
    await (
      await this.postService.removePost(removedSchedule.postId)
    ).toPromise();
    await (
      await this.fileService.removeAttachementsByPostId(removedSchedule.postId)
    ).toPromise();
    return true;
  }

  async getAllPostsToGo(params: IPostTogo) {
    let result = await this.client
      .send<any, IPostTogo>('getAllPostsToGo', params)
      .toPromise();
    if (!result) return null;

    result.results = await this.createPostsReport(result.results);
    return await result;
  }

  async getAllPostsDateRange(range: IPostRange) {
    let result = await this.client
      .send<any, IPostRange>('getAllPostsDateRange', range)
      .toPromise();
    if (!result) return null;

    result.results = await this.createPostsReport(result.results);
    return await result;
  }

  async getAllPostsArch(params: IPostArchive) {
    let result = await this.client
      .send<any, IPostArchive>('getAllPostsArch', params)
      .toPromise();
    if (!result) return null;

    result.results = await this.createPostsReport(result.results);
    return await result;
  }

  private async createPostsReport(array) {
    return await Promise.all(
      array.map(async item => {
        const postInfo = await (
          await this.postService.getPostById(item.postId)
        ).toPromise();
        const postAttachements = await this.fileService.getAttachementsByPostId(
          item.postId,
        );

        const provider = await this.postService.getProviderNameById(
          item.providerId,
        );
        return {
          schdeuleId: item._id,
          postInfo,
          providerName: provider.name,
          postAttachements: postAttachements,
          postTime: item.postTime,
        };
      }),
    );
  }
}
