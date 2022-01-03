import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { RmqService } from './rmq.service';
import { CreateProduct } from './create-product.dto';
import axios from 'axios';
import { CreateUserDto } from './create-user.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly rmqService: RmqService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('sendMessage')
  async sendMessage(@Body('message') message: string) {
    return this.appService.sendTcpMessage(message);
  }

  @Post('createProduct')
  async createProduct(@Body() product: CreateProduct) {
    return this.rmqService.sendMessage('createProduct', product);
  }

  @Get('products')
  async getProducts() {
    const result = await axios.get('http://localhost:3001/products');
    return result.data;
  }

  @Post('user')
  async createUser(@Body() user: CreateUserDto) {
    return this.appService.createUser(user);
  }
}
