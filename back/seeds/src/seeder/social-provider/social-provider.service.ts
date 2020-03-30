import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ISocialProvider } from './interfaces/social-provider.interface';
import { socialProviders } from 'src/seeder/social-provider/social-provider.data';

@Injectable()
export class SocialProviderSeederService {
  constructor(
    @InjectModel('SocialProvider')
    private readonly socialProviderModel: Model<ISocialProvider>,
  ) {}

  create(): Array<Promise<ISocialProvider>> {
    return socialProviders.map(async (socialProvider: ISocialProvider) => {
      return await this.socialProviderModel
        .findOne({ name: socialProvider.name })
        .exec()
        .then(async dbSocialProvider => {
          if (dbSocialProvider) {
            return Promise.resolve(null);
          }

          return Promise.resolve(
            await this.socialProviderModel.create(socialProvider),
          );
        })
        .catch(error => Promise.reject(error));
    });
  }
}
