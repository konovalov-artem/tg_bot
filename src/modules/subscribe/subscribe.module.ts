import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { SubscribeSchema } from './schemas/subscribe.schema'
import { SubscribeService } from './services/subscribe.service'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Subscribe', schema: SubscribeSchema }])
  ],
  providers: [SubscribeService]
})
export class SubscribeModule {}
