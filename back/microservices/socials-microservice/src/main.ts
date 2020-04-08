import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { connectionConstants } from './constants';

const microserviceOptions = {
  transport: Transport.TCP,
  options: {
    host: connectionConstants.host,
    port: connectionConstants.socialProvidersPort,
  },
};

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    AppModule,
    microserviceOptions,
  );
  await app.listen(() => {
    console.debug('Socials microservice is listening');
  });
}
bootstrap();
