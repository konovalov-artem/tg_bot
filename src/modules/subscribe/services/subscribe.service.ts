import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateSubscribeDto, UpdateSubscribeDto } from '../dtos'
import { Subscribe } from '../interfaces'

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

  async deleteOne(condition: Partial<Subscribe>): Promise<any> {
    return this.subscribeModel.deleteOne(condition)
  }

  async updateOne(condition: Partial<Subscribe>, input: UpdateSubscribeDto): Promise<Subscribe[]> {
    const { data } = input

    return this.subscribeModel.updateOne(condition, { $push: { $each: data } })
  }

  async getMany(): Promise<Subscribe[]> {
    // todo: add sort({ advData: 1 })
    return this.subscribeModel.find().exec()
  }
}
