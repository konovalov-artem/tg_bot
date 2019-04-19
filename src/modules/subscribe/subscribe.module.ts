import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { SubscribeSchema } from './schemas'
import { SubscribeService } from './services'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Subscribe', schema: SubscribeSchema }])
  ],
  providers: [SubscribeService],
  exports: [SubscribeService]
})
export class SubscribeModule {}
