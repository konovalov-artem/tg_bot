import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule, ConfigService } from 'nestjs-config'
import { resolve } from 'path'
import { BotModule } from './modules/bot/bot.module'
import { MessageModule } from './modules/message/message.module'
import { SiteModule } from './modules/site/site.module'
import { SubscribeModule } from './modules/subscribe/subscribe.module'
import { UserModule } from './modules/user/user.module'

@Module({
  imports: [
    ConfigModule.load(resolve(__dirname, '**/*/!(*.d).config.{ts,js}'), {
      modifyConfigName: (name: string) => name.replace('.config', ''),
      path: `config.env`
    }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => configService.get('database'),
      inject: [ConfigService]
    }),
    UserModule,
    SubscribeModule,
    BotModule,
    SiteModule,
    MessageModule
  ]
})
export class AppModule {}
