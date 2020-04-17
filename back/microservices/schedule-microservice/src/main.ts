import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { connectionConstants } from './constants';

const microserviceOptions = {
  transport: Transport.TCP,
  options: {
    host: connectionConstants.host,
    port: connectionConstants.schedulesMicroservicePort,
  },
};

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    AppModule,
    microserviceOptions,
  );
  app.listen(() => {
    console.debug('Getaway is listening');
  });
}
bootstrap();