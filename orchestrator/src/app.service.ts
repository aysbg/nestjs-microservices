import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 8001,
      },
    });
  }

  public async sendTcpMessage(message: string) {
    return this.client.send<string, string>('tcp-message', message);
  }
  public async createUser(user: CreateUserDto) {
    return this.client.send<CreateUserDto, any>('createUser', user);
  }
}
