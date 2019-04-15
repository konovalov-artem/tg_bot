import { Module } from '@nestjs/common'
import { PuppeteerService } from './services/puppeteer.service'
import { SiteService } from './services/site.service'

@Module({
  providers: [SiteService, PuppeteerService]
})
export class SiteModule {}
