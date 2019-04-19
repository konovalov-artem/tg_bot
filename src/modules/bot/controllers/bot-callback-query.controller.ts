import { Injectable } from '@nestjs/common'
import { isEmpty } from 'lodash'
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
    private readonly botService: BotService,
    private readonly subscribeService: SubscribeService
  ) {}

  async handleCallbackQuery(query: CallbackQuery): Promise<any> {
    const {
      message: {
        chat: { id: telegramId }
      }
    } = query

    switch (query.data) {
      case CallbackQueryType.NEW_SUBSCRIBE:
        return this.handleNewSubscribe(telegramId)
      case CallbackQueryType.MY_SUBSCRIBES:
        return this.handleMySubscribes(telegramId)
      case CallbackQueryType.DELETE_SUBSCRIBE:
        return this.handleDeleteSubscribe()
      default:
        return
    }
  }

  async handleNewSubscribe(telegramId: number): Promise<Message> {
    return this.botService.sendMessage(
      telegramId,
      this.configService.get('message.newSubscribe'),
      this.configService.get('message.newSubscribeOptions')
    )
  }

  async handleMySubscribes(telegramId: number): Promise<any> {
    const subscribes = await this.subscribeService.getMany({ telegramId })

    if (isEmpty(subscribes)) {
      return this.botService.sendMessage(
        telegramId,
        this.configService.get('messages.doNotHaveSubscribes'),
        this.configService.get('message.doNotHaveSubscribesOptions')
      )
    } else {
      return Promise.all(
        subscribes.map((subscribe: Subscribe) =>
          this.botService.sendMessage(
            telegramId,
            this.configService.get('message').prettyLink(subscribe.url, subscribe.title),
            this.configService.get('message.deleteSubscribeOptions')
          )
        )
      )
    }
  }

  handleDeleteSubscribe() {
    const url = query.message.entities[0].url
    const chatId = chatId
    process.deleteSub(url, chatId)
    chat.delsub(query)
  }
}
