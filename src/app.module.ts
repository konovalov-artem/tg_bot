import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule, ConfigService } from 'nestjs-config'
import { resolve } from 'path'
import { BotModule } from './modules/bot'
import { MessageModule } from './modules/message'
import { SiteModule } from './modules/site'
import { SubscribeModule } from './modules/subscribe'
import { UserModule } from './modules/user'

@Module({
  imports: [
    ConfigModule.load(resolve(__dirname, '**/*/!(*.d).config.{ts,js}'), {
      modifyConfigName: (name: string) => name.replace('.config', ''),
    }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => configService.get('database'),
      inject: [ConfigService],
    }),
    UserModule,
    SubscribeModule,
    BotModule,
    SiteModule,
    MessageModule,
  ]
})
export class AppModule {}
