import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common'
import { ConfigService } from 'nestjs-config'
import TelegramBot, {
  AnswerCallbackQueryOptions,
  CallbackQuery,
  Message,
  SendMessageOptions
} from 'node-telegram-bot-api'
import { BotCallbackQueryController } from '../controllers/bot-callback-query.controller'
import { BotTextController } from '../controllers/bot-text.controller'

@Injectable()
export class BotService {
  private readonly bot: TelegramBot

  constructor(
    private readonly configService: ConfigService,
    @Inject(forwardRef(() => BotTextController))
    private readonly botTextController: BotTextController,
    private readonly botCallbackQueryController: BotCallbackQueryController
  ) {
    this.bot = new TelegramBot(this.configService.get('bot.token'), { polling: true })

    this.initBot()
  }

  initBot() {
    this.bot.on('text', async (msg: Message) => {
      Logger.log(msg, 'BOT EVENT TEXT msg:')

      await this.botTextController.handleMessage(msg)
    })

    this.bot.on('callback_query', async (query: CallbackQuery) => {
      Logger.log(query, 'BOT EVENT CALLBACK QUERY query:')

      await this.botCallbackQueryController.handleCallbackQuery(query)
    })
  }

  async sendMessage(chatId: number, text: string, options?: SendMessageOptions): Promise<Message> {
    return this.bot.sendMessage(chatId, text, options)
  }

  async deleteMessage(chatId: number, messageId: string): Promise<any> {
    return this.bot.deleteMessage(chatId, messageId)
  }

  async answerCallbackQuery(callbackQueryId: string, options?: Partial<AnswerCallbackQueryOptions>): Promise<boolean> {
    return this.bot.answerCallbackQuery(callbackQueryId, options)
  }
}
