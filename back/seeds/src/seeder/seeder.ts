import { Injectable, Logger } from '@nestjs/common';
import { SocialProviderSeederService } from './social-provider/social-provider.service';

@Injectable()
export class Seeder {
  constructor(
    private readonly logger: Logger,
    private readonly socialProviderSeederService: SocialProviderSeederService,
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
    return await Promise.all(this.socialProviderSeederService.create())
      .then(createdSocialProviders => {
        this.logger.debug(
          'count of created social providers: ' +
            createdSocialProviders.filter(
              nullValueOrCreated => nullValueOrCreated,
            ).length,
        );
        return Promise.resolve(true);
      })
      .catch(error => Promise.reject(error));
  }
}
