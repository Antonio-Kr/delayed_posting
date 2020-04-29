import { Injectable } from '@nestjs/common';
import * as cloudinary from 'cloudinary';
import { InjectModel } from '@nestjs/mongoose';
import { IAttachement } from './interfaces/attachement.interface';
import { Model } from 'mongoose';
import { CreateAttachementDto } from './dto/create-attachement.dto';
import { IAttachementResult } from './interfaces/attachement-result.interface';
import { IUpdateAttachements } from './interfaces/update-attachements.interface';
import { IAttachementRemove } from './interfaces/attachement-remove.interface';

@Injectable()
export class FilesService {
  constructor(
    @InjectModel('Attachement') private attachementModel: Model<IAttachement>,
  ) {
    cloudinary.v2.config({
      cloud_name: 'delayedposting',
      api_key: '748794515192317',
      api_secret: 'kbZ21WcDCjeYjPaZTzN6Da8iMLY',
    });
  }

  async uploadFile(file: any): Promise<IAttachementResult> {
    let b64 = Buffer.from(file.buffer.data).toString('base64');
    const resourceType = file.mimetype.replace(/\/.+/, '');

    let attachementResult = await cloudinary.v2.uploader
      .upload(`data:${file.mimetype};base64,${b64}`, {
        resource_type: resourceType,
      })
      .then(async result => {
        let attachementDto: CreateAttachementDto = this.createAttachementDto(
          result,
        );
        const createdAttachement = new this.attachementModel(attachementDto);
        const saveResult = this.saveAttachement(createdAttachement);
        return await saveResult;
      })
      .catch(error => error);

    await console.log(attachementResult);
    if (attachementResult.error) {
      attachementResult = null;
    }
    return await attachementResult;
  }

  async getAttachementsByPostId(postId: string) {
    return await this.attachementModel.find({ postId }).exec();
  }

  async removeAttachement(removeContent: IAttachementRemove) {
    await cloudinary.v2.uploader.destroy(removeContent.fileId);
    return await this.attachementModel.remove({ fileId: removeContent.fileId });
  }

  async removeAttachementsByPostId(postId: string) {
    const attachements = await this.attachementModel.find({ postId }).exec();
    attachements.forEach(
      async att => await cloudinary.v2.uploader.destroy(att.fileId),
    );
    return await this.attachementModel.remove({ postId }).exec();
  }

  async updateAttachements(attachements: IUpdateAttachements) {
    return await Promise.all(attachements.attachements).then(async () => {
      await attachements.attachements.map(att => {
        this.attachementModel
          .update(
            { fileId: att.fileId },
            { $set: { postId: attachements.postId } },
          )
          .exec();
      });
      return Promise.resolve(true);
    });
  }

  private createAttachementDto(saveData): CreateAttachementDto {
    return {
      contentType: saveData.resource_type,
      createdAt: new Date(),
      fileId: saveData.public_id,
      link: saveData.secure_url,
      postId: '0',
    };
  }

  private async saveAttachement(
    createdAttachement,
  ): Promise<IAttachementResult> {
    return await createdAttachement
      .save()
      .then(
        async (result): Promise<IAttachementResult> => {
          return {
            fileId: result.fileId,
            link: result.link,
          };
        },
      )
      .catch(error => error);
  }

  async attachementsLink(postId:string){
    let attachements:IAttachement = await this.attachementModel.findOne({'postId':postId});
    return attachements.link;
  }
}
