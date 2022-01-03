import { Body, Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateUserDto } from './create-user.dto';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('createUser')
  async createUser(@Body() user: CreateUserDto): Promise<any> {
    return this.userService.create(user);
  }
}
