import { Injectable } from '@nestjs/common'
import { CallbackQuery } from 'node-telegram-bot-api'

@Injectable()
export class BotCallbackQueryController {

  async handleCallbackQuery(query: CallbackQuery) {
    // const chat = this.chatService.getChat(query.message.chat.id)
    //
    // switch (query.data) {
    //   case 'new sub':
    //     chat
    //     break
    //   case 'my subs':
    //     chat
    //     break
    //   case 'del sub':
    //     chat
    //     break
    //   default:
    // }
    //
    // if (query.data === 'newsubs') {
    //   chat.newsubs()
    // } else if (query.data === 'mysubs') {
    //   const subscribes = process.getUserSubs(query.message.chat.id)
    //   chat.mysubs(subscribes)
    // } else if (query.data === 'delsub') {
    //   const url = query.message.entities[0].url
    //   const chatId = query.message.chat.id
    //   process.deleteSub(url, chatId)
    //   chat.delsub(query)
    // }
    console.log({ query })
  }
}
