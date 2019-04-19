import { Module } from '@nestjs/common'
import { MessageModule } from '../message'
import { UserModule } from '../user'
import { BotCallbackQueryController, BotTextController } from './controllers'
import { BotService } from './services'

@Module({
  imports: [UserModule, MessageModule],
  providers: [BotService, BotTextController, BotCallbackQueryController],
  exports: [BotService]
})
export class BotModule {}
