import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ISocialProvider } from '../../interfaces/social-provider.interface';
import { socialProviders } from 'src/seeder/social-provider/social-provider.data';

@Injectable()
export class SocialProviderSeederService {
  constructor(
    @InjectModel('SocialProvider')
    private readonly socialProviderModel: Model<ISocialProvider>,
  ) {}

  async create(): Promise<Array<Promise<ISocialProvider>>> {
    const providerNameArr = socialProviders.map(provider => provider.name);

    return await this.socialProviderModel
      .find({
        name: providerNameArr,
      })
      .exec()
      .then(result => {
        const existsInBase = result.map(res => res.name);
        const diff = providerNameArr.filter(x => !existsInBase.includes(x));
        const socialProvidersToCreate = socialProviders.filter(provider =>
          diff.includes(provider.name),
        );
        if (socialProvidersToCreate.length == 0) return Promise.resolve([null]);
        else
          return Promise.resolve(
            this.socialProviderModel.create(socialProvidersToCreate),
          );
      })
      .catch(error => {
        Promise.reject(error);
      });
  }
}
