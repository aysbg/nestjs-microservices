import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RmqService } from './rmq.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, RmqService],
})
export class AppModule {}
