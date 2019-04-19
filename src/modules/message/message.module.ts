import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UserModule } from '../user'
import { MessageSchema } from './schemas'
import { MessageService } from './services'

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Message', schema: MessageSchema }]), UserModule],
  providers: [MessageService],
  exports: [MessageService]
})
export class MessageModule {}
