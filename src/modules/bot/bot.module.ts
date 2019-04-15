import { Module } from '@nestjs/common'
import { UserModule } from '../user/user.module'
import { BotCallbackQueryController } from './controllers/bot-callback-query.controller'
import { BotTextController } from './controllers/bot-text.controller'
import { BotService } from './services/bot.service'

@Module({
  imports: [UserModule],
  providers: [BotService, BotTextController, BotCallbackQueryController]
})
export class BotModule {}
