import { forwardRef, Inject, Injectable } from '@nestjs/common'
import { get, isEmpty } from 'lodash'
import { ConfigService } from 'nestjs-config'
import { CallbackQuery, Message } from 'node-telegram-bot-api'
import { Subscribe } from '../../subscribe/interfaces'
import { SubscribeService } from '../../subscribe/services'
import { CallbackQueryType } from '../enums'
import { BotService } from '../services'

@Injectable()
export class BotCallbackQueryController {
  constructor(
    private readonly configService: ConfigService,
    @Inject(forwardRef(() => BotService))
    private readonly botService: BotService,
    private readonly subscribeService: SubscribeService
  ) {}

  async handleCallbackQuery(query: CallbackQuery): Promise<any> {
    const callbackQueryId = get(query, 'id')
    const messageId = get(query, 'message.message_id')
    const telegramId = get(query, 'message.chat.id')
    const url = get(query, 'entities[0].url')

    switch (query.data) {
      case CallbackQueryType.NEW_SUBSCRIBE:
        return this.handleNewSubscribe(telegramId)
      case CallbackQueryType.MY_SUBSCRIBES:
        return this.handleMySubscribes(telegramId)
      case CallbackQueryType.DELETE_SUBSCRIBE:
        return this.handleDeleteSubscribe(telegramId, url, callbackQueryId, messageId.toString())
      default:
        return
    }
  }

  async handleNewSubscribe(telegramId: number): Promise<Message> {
    return this.botService.sendMessage(
      telegramId,
      this.configService.get('message.newSubscribe'),
      this.configService.get('message-options.newSubscribe')
    )
  }

  async handleMySubscribes(telegramId: number): Promise<any> {
    const subscribes = await this.subscribeService.getMany({ telegramId })

    if (isEmpty(subscribes)) {
      return this.botService.sendMessage(
        telegramId,
        this.configService.get('message.doNotHaveSubscribes'),
        this.configService.get('message-options.doNotHaveSubscribes')
      )
    } else {
      return Promise.all(
        subscribes.map((subscribe: Subscribe) =>
          this.botService.sendMessage(
            telegramId,
            this.configService.get('message').prettyLink(subscribe.url, subscribe.title),
            this.configService.get('message-options.deleteSubscribe')
          )
        )
      )
    }
  }

  async handleDeleteSubscribe(telegramId: number, url: string, callbackQueryId: string, messageId: string) {
    await this.subscribeService.deleteOne({ telegramId, url })
    await this.botService.deleteMessage(telegramId, messageId)
    await this.botService.answerCallbackQuery(
      callbackQueryId,
      this.configService.get('message.deleteSubscribe')
    )
  }
}
