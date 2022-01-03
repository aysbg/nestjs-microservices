import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'kripto_queue',
      noAck: false,
      queueOptions: {
        durable: false,
      },
    },
  });

  app.startAllMicroservices();
  await app.listen(3001);
}
bootstrap();
