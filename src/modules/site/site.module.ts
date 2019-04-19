import { Module } from '@nestjs/common'
import { BotModule } from '../bot'
import { SubscribeModule } from '../subscribe'
import { ProcessService, PuppeteerService, SiteService } from './services'

@Module({
  imports: [SubscribeModule, BotModule],
  providers: [SiteService, PuppeteerService, ProcessService]
})
export class SiteModule {}
