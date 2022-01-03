import { Controller, Get } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAllProducts() {
    return await this.productService.findAll();
  }

  @MessagePattern('createProduct')
  async createProduct(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    console.log(data);
    await this.productService.create(data);

    channel.ack(context.getMessage());
  }
}
