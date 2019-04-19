import { forwardRef, Inject, Injectable } from '@nestjs/common'
import { ConfigService } from 'nestjs-config'
import { Message, SendMessageOptions } from 'node-telegram-bot-api'
import { UserService } from '../../user/services/user.service'
import { BotService } from '../services/bot.service'

@Injectable()
export class BotTextController {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    @Inject(forwardRef(() => BotService))
    private readonly botService: BotService
  ) {}

  async handleMessage(msg: Message) {
    const { text, chat: { id: telegramId }, from: { first_name: firstName, username: userName } } = msg
    const user = await this.userService.findOneOrCreate({ firstName, userName, telegramId })
    let message: string = 'some default answer'
    let messageOptions: SendMessageOptions

    switch (text) {
      case '/start':
        message = 'start'
        break
      case '/menu':
        message = 'menu'
        break
      default:
    }

    if (text === '/start' || text === '/menu') {
      const configKey = text.replace(/\//, '')
      message = this.configService.get(`message.${configKey}`)
      messageOptions = this.configService.get(`message-options.${configKey}`)
    }
    // if (text.startsWith('http')) {
    //   const userSub = process.getSub(msg.text, msg.chat.id)
    //   const arg = userSub || msg.text
    //   const unsuppUrl = chat.scanUrl(arg)
    //   if (unsuppUrl) {
    //     process.saveUnsuppUrl(unsuppUrl)
    //   }
    // } else if (chat.pendingRequest) {
    //   const newSubscribe = chat.setTitle(msg.text)
    //   process.saveSub(newSubscribe)
    //   chat.pendingRequest = ''
    // }
    await this.botService.sendMessage(user.telegramId, message, messageOptions)
  }
}
