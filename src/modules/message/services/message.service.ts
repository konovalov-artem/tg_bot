import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { IMessageService, Message } from '../interfaces'

@Injectable()
export class MessageService implements IMessageService {
  constructor(
    @InjectModel('Message')
    private readonly messageModel: Model<Message>
  ) {}

  async getMany(): Promise<Message[]> {
    return this.messageModel.find().exec()
  }
}
