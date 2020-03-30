import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IPostTemplate } from './interfaces/post-template.interface';
import { postTemplates } from './post-templates.data';
import { INameIdCouple } from 'src/interfaces/name-id.interface';

@Injectable()
export class PostTemplateSeederService {
  constructor(
    @InjectModel('PostTemplate')
    private readonly postTemplateModel: Model<IPostTemplate>,
  ) {}

  create(nameIdCouples: INameIdCouple[]): Array<Promise<IPostTemplate>> {
    let i = 0;
    return postTemplates.map(async (postTemplate: IPostTemplate) => {
      const nameIdCouple = nameIdCouples.filter(
        v => v.name === postTemplate.providerId,
      )[0];
      console.log(postTemplate.providerId, nameIdCouple.name);
      postTemplate.providerId = nameIdCouple.id;
      return await this.postTemplateModel.create(postTemplate);
    });
  }
}
