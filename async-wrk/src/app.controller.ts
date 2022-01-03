import { Controller, Get } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern('print')
  async printMessage(@Payload() data: any, @Ctx() context: RmqContext) {
    console.log(data);

    const channel = context.getChannelRef();
    channel.ack(context.getMessage());
  }
}
