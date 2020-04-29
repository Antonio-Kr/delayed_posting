import { Injectable, Scope, Inject } from '@nestjs/common';
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

  async uploadFile(file) {
    const resourceType = file.file.mimetype.replace(/\/.+/, '');
    return new Promise((resolve, reject) => {
      const upload_stream = cloudinary.v2.uploader.upload_stream(
        { resource_type: resourceType },
        (err, image) => {
          if (err) {
            reject(err);
          }
          let attachementDto: CreateAttachementDto = this.createAttachementDto(
            image,
          );
          const createdAttachement = new this.attachementModel(attachementDto);
          const saveResult = this.saveAttachement(createdAttachement);
          resolve(saveResult);
        },
      );
      upload_stream.end(Buffer.from(file.file.buffer.data));
    });
  }

  async getAttachementsByPostId(postId: string) {
    return await this.attachementModel.find({ postId }).exec();
  }

  async removeAttachement(removeContent: IAttachementRemove) {
    await cloudinary.v2.uploader.destroy(removeContent.fileId);
    return await this.attachementModel.remove({ fileId: removeContent.fileId });
  }

  async updateAttachements(attachements: IUpdateAttachements) {
    return await Promise.all(attachements.attachements).then(() => {
      attachements.attachements.map(att => {
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
      createdAt: saveData.created_at,
      fileId: saveData.public_id,
      link: saveData.secure_url,
      postId: '0',
    };
  }

  private async saveAttachement(
    createdAttachement,
  ): Promise<IAttachementResult> {
    let result = await createdAttachement.save();
    return {
      fileId: result.fileId,
      link: result.link,
    };
  }
}
