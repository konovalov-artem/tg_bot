import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateUserDto } from '../dtos/create-user.dto'
import { User } from '../interfaces/user.interface'

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User>
  ) {}

  async create(input: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(input)

    return createdUser.save()
  }

  async findOneOrCreate(input: CreateUserDto): Promise<User> {
    const { telegramId } = input
    const user = await this.userModel.findOne({ telegramId })

    if (Boolean(user)) {
      return user
    } else {
      return this.create(input)
    }
  }
}
