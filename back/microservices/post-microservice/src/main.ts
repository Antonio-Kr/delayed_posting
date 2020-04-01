import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { connectionConstants } from './constants';
import { Logger } from '@nestjs/common';
import { Seeder } from './seeder/seeder';

const microserviceOptions = {
  transport: Transport.TCP,
  options: {
    host: connectionConstants.host,
    port: connectionConstants.postMicroservicePort,
  },
};

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    AppModule,
    microserviceOptions,
  ).then(appContext => {
    const logger = appContext.get(Logger);
    const seeder = appContext.get(Seeder);

    seeder
      .seed()
      .then(() => {
        logger.debug('Seeding success');
      })
      .catch(error => {
        logger.debug('Seeding error');
        throw error;
      });

    return Promise.resolve(appContext);
  });

  await app.listen(() => {
    console.log('Post microservice is listening');
  });
}

bootstrap();
