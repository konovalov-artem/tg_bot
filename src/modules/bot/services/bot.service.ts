import { Injectable } from '@nestjs/common'
import { ConfigService } from 'nestjs-config'
// # Promise fix from https://github.com/yagop/node-telegram-bot-api/issues/319
process.env.NTBA_FIX_319 = '1'
import TelegramBot, { Message, Metadata } from 'node-telegram-bot-api'

@Injectable()
export class BotService {
  private readonly bot: TelegramBot

  constructor(
    private readonly configService: ConfigService
  ) {
    this.bot = new TelegramBot(this.configService.get('bot.token'), { polling: true })

    this.initBot()
  }

  initBot() {
    this.bot.on('text', (msg: Message, metadata: Metadata) => {
      console.log({ msg, metadata })
    })
  }
}
