import { Injectable, Logger } from '@nestjs/common'
import { assign, omit } from 'lodash'
import { ConfigService } from 'nestjs-config'
import URL from 'url'
import { SiteType } from '../interfaces/site.type'
import { PuppeteerService } from './puppeteer.service'

@Injectable()
export class SiteService {
  constructor(
    private readonly puppeteerService: PuppeteerService,
    private readonly configService: ConfigService
  ) {}

  async getNewMessages(url: string, siteType: SiteType): Promise<any> {
    await this.puppeteerService.gotToUrl(this.fixUrl(url, siteType))

    let data = []

    while (true) {
      const pageData = await this.getPageData()
      pageData.forEach((dataElement: any) => {
        dataElement.link = this.removeHashFromUrl(dataElement.link)
      })
      const nextPageUrl = this.puppeteerService.getNextPageUrl()
      data = data.concat(pageData)

      if (pageData.length === 0 || data.length > this.maxAdvCount) {
        break
      }

      await this.puppeteerService.gotToUrl(nextPageUrl)
    }

    return this.dataHandling()
  }

  async getPageData(): Promise<any> {

    return this.puppeteerService.pageEvaluate({ advertSelector, linkSelector, titleSelector })
  }

  fixUrl(url: string, siteType: SiteType): string {
    const parsedUrl = URL.parse(url, true)
    parsedUrl.query = omit(parsedUrl.query, this.configService.get('site.removableUrlParams'))
    assign(parsedUrl.query, this.configService.get(`site[${siteType}].startParams`))

    Logger.log(`Before: ${url}; After: ${URL.format(parsedUrl)}`, 'SiteService: fixUrl')

    return URL.format(parsedUrl)
  }

  removeHashFromUrl(url: string): string {
    return URL.format(omit(URL.parse(url, true), ['hash']))
  }

  dataHandling () {
    const message = []

    if (this.dbData) {
      let dbData = new Set(this.dbData)
      let newData = []
      this.data.forEach((item) => {
        if (!dbData.has(item.link)) {
          message.push({
            chatId: this.chatId,
            link: item.link,
            title: item.title.replace(/\n\t/g, ''),
            url: this.url
          })
          newData.push(item)
        }
      })
      this.data = newData
    }
    return message
  }
}
