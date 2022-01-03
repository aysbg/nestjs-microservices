import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  RmqRecordBuilder,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class RmqService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
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
  }

  public sendMessage(eventName: string, payload: any) {
    const record = new RmqRecordBuilder(payload)
      .setOptions({
        headers: {
          ['x-version']: '1.0',
        },
        priority: 3,
      })
      .build();

    this.client.send(eventName, record).subscribe(() => console.log('sent'));
  }
}
