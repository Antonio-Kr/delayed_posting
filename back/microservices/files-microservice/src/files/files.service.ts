import { Injectable, Scope, Inject } from '@nestjs/common';
import * as cloudinary from 'cloudinary';
import { InjectModel } from '@nestjs/mongoose';
import { IAttachement } from './interfaces/attachement.interface';
import { Model } from 'mongoose';
import { CreateAttachementDto } from './dto/create-attachement.dto';
import { IAttachementResult } from './interfaces/attachement-result.interface';
import { IUpdateAttachements } from './interfaces/update-attachements.interface';
import { IAttachementRemove } from './interfaces/attachement-remove.interface';
import { Readable } from 'stream';

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
  private dataStreamArr = {};

  async uploadFile(dataStream) {
    if (dataStream.chunk) {
      if (!this.dataStreamArr[dataStream.uuid]) {
        this.dataStreamArr[dataStream.uuid] = [];
      }

      this.dataStreamArr[dataStream.uuid] = this.dataStreamArr[
        dataStream.uuid
      ].concat(dataStream.chunk.data);
    } else {
      console.log(this.dataStreamArr[dataStream.uuid]);

      let res = await this.upload(dataStream);
      console.log(1);
      delete this.dataStreamArr[dataStream.sym];
      return await res;
    }

    // let b64 = Buffer.from(file.buffer.data).toString('base64');
    // const resourceType = file.mimetype.replace(/\/.+/, '');
    // let attachementResult = await cloudinary.v2.uploader
    //   .upload(`data:${file.mimetype};base64,${b64}`, {
    //     resource_type: resourceType,
    //   })
    //   .then(async result => {
    //     let attachementDto: CreateAttachementDto = this.createAttachementDto(
    //       result,
    //     );
    //     const createdAttachement = new this.attachementModel(attachementDto);
    //     const saveResult = this.saveAttachement(createdAttachement);
    //     return await saveResult;
    //   })
    //   .catch(error => error);
    // if (attachementResult.error) {
    //   attachementResult = null;
    // }
    // return await attachementResult;
  }

  async removeAttachement(removeContent: IAttachementRemove) {
    await cloudinary.v2.uploader.destroy(removeContent.fileId);
    return await this.attachementModel.remove({ fileId: removeContent.fileId });
  }

  async updateAttachements(attachements: IUpdateAttachements) {
    return await Promise.all(attachements.attachements).then(() => {
      attachements.attachements.map(att => {
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

  private async upload(dataStream) {
    const uuid = dataStream.uuid;
    return new Promise((resolve, reject) => {
      const upload_stream = cloudinary.v2.uploader.upload_stream(
        {},
        (err, image) => {
          if (err) {
            reject(err);
          }
          console.log(image);

          let attachementDto: CreateAttachementDto = this.createAttachementDto(
            image,
          );
          const createdAttachement = new this.attachementModel(attachementDto);
          const saveResult = this.saveAttachement(createdAttachement);
          resolve(saveResult);
        },
      );
      let data = Buffer.from(this.dataStreamArr[uuid]);

      const readable = new Readable({
        read(size) {
          let wantMore = true;
          while (wantMore) {
            const chunk = data.slice(0, size);
            if (!chunk || chunk.length == 0) {
              return this.push(null);
            }
            wantMore = this.push(chunk);
            data = data.slice(size);
          }
        },
      });
      readable.pipe(upload_stream);
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
