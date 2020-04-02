import { Injectable, Logger } from '@nestjs/common';
import { SocialProviderSeederService } from './social-provider/social-provider.service';
import { PostTemplateSeederService } from './post-template/post-template.service';
import { INameIdCouple } from './interfaces/name-id.interface';

@Injectable()
export class Seeder {
  constructor(
    private readonly logger: Logger,
    private readonly socialProviderSeederService: SocialProviderSeederService,
    private readonly postTemplateSeederService: PostTemplateSeederService,
  ) {}

  async seed() {
    await this.socialProviders()
      .then(completed => {
        this.logger.debug('Successfuly seeded');
        Promise.resolve(completed);
      })
      .catch(error => {
        this.logger.debug('Failed seeding');
        Promise.reject(error);
      });
  }

  async socialProviders() {
    return await Promise.all(await this.socialProviderSeederService.create())
      .then(async createdSocialProviders => {
        createdSocialProviders = createdSocialProviders.filter(
          provider => provider,
        );
        if (createdSocialProviders.length > 0) {
          const nameIdCouples = createdSocialProviders.map(
            (socialProvider): INameIdCouple => {
              return {
                id: socialProvider['_id'].toString(),
                name: socialProvider.name.toLowerCase(),
              };
            },
          );
          await Promise.all(
            this.postTemplateSeederService.create(nameIdCouples),
          );
        }

        return await Promise.resolve(true);
      })
      .catch(error => {
        Promise.reject(error);
      });
  }
}
