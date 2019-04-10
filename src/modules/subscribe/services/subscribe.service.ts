import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateSubscribeDto } from '../dtos/create-subscribe.dto'
import { DeleteSubscribeDto } from '../dtos/delete-subscribe.dto'
import { UpdateSubscribeDto } from '../dtos/update-subscribe.dto'
import { Subscribe } from '../interfaces/subscribe.interface'

@Injectable()
export class SubscribeService {
  constructor(
    @InjectModel('Subscribe')
    private readonly subscribeModel: Model<Subscribe>
  ) {}

  async create(input: CreateSubscribeDto): Promise<Subscribe> {
    const createdSubscribe = new this.subscribeModel(input)

    return createdSubscribe.save()
  }

  async deleteOne(input: DeleteSubscribeDto): Promise<any> {
    const { chatId, url } = input

    return this.subscribeModel.deleteOne({ chatId, url })
  }

  async updateOne(input: UpdateSubscribeDto): Promise<Subscribe[]> {
    const { chatId, url, data } = input

    return this.subscribeModel.updateOne({ chatId, url }, { $push: { $each: data } })
  }

  async getMany() {
    // todo: add sort({ advData: 1 })
    return this.subscribeModel.find().exec()
  }
}
