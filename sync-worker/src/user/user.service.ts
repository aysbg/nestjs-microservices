import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(user: CreateUserDto): Promise<any> {
    const newUser = {
      email: user.email,
      details: {
        firstName: user.firstName,
        lastName: user.lastName,
      },
    };

    return this.userModel.create(newUser);
  }

  async findAll(): Promise<any> {
    return this.userModel.find();
  }
}
