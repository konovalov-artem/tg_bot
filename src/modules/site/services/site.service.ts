import { Injectable, Logger } from '@nestjs/common'
import { assign, isEmpty, isUndefined, omit } from 'lodash'
import { ConfigService } from 'nestjs-config'
import URL from 'url'
import { Subscribe } from '../../subscribe/interfaces'
import { SubscribeService } from '../../subscribe/services'
import { PageEvaluateArgumentsInterface, SiteType } from '../interfaces'
import { PuppeteerService } from './puppeteer.service'

@Injectable()
export class SiteService {
  private readonly maxAdvCount: number

  constructor(
    private readonly puppeteerService: PuppeteerService,
    private readonly configService: ConfigService,
    private readonly subscribeService: SubscribeService
  ) {
    this.maxAdvCount = this.configService.get('site.maxAdvCount')
  }

  async getNewMessages(subscribe: Subscribe): Promise<any> {
    const { url, siteType } = subscribe

    await this.puppeteerService.gotToUrl(this.fixUrl(url, siteType))
    const selectors = this.getHtmlSelectors(siteType)

    const data = await this.getPageData([], selectors)

    return this.dataHandling(data, subscribe)
  }

  async getPageData(startData: any[], selectors: PageEvaluateArgumentsInterface): Promise<any> {
    const evaluatedData = await this.puppeteerService.pageEvaluate(selectors)
    const pageData = [...startData, ...this.removeUrlHashFromPageData(evaluatedData)]

    await this.puppeteerService.goToNextPageUrl()
    // const nextPageUrl = this.puppeteerService.getNextPageUrl()

    if (isEmpty(pageData) || startData.length > this.maxAdvCount) {
      return pageData
    }

    return this.getPageData(pageData, selectors)
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

  removeUrlHashFromPageData(data: { link: string; title: string }[]): { link: string; title: string }[] {
    return data.map(({ link, title }: { link: string; title: string }) => ({
      link: this.removeHashFromUrl(link),
      title
    }))
  }

  getHtmlSelectors(siteType: SiteType): PageEvaluateArgumentsInterface {
    const defaultPath = `site.${siteType}.selectors`

    return {
      linkSelector: this.configService.get(`${defaultPath}.link`),
      titleSelector: this.configService.get(`${defaultPath}.title`),
      advertSelector: this.configService.get(`${defaultPath}.advert`)
    }
  }

  async dataHandling(
    data: { link: string; title: string }[],
    subscribe: Subscribe
  ): Promise<any[]> {
    const { advData, title: subscribeTitle, telegramId, url } = subscribe
    let newData: { link: string; title: string }[]

    if (!isEmpty(data)) {
      const dbData = new Set(advData)
      newData = data.filter(({ link }: { link: string }) => !dbData.has(link))
    }

    if (!isEmpty(newData) || isUndefined(advData)) {
      await this.subscribeService.updateOne({ telegramId, url }, { data })
    }

    if (newData.length > 30) {
      await this.subscribeService.deleteOne({ url, telegramId })

      return [{ telegramId, message: this.configService.get('message').manyResults(url, subscribeTitle) }]
    } else {
     return newData.map((dataItem: { link: string; title: string }) => ({
        telegramId,
        link: dataItem.link,
        title: dataItem.title.replace(/\n\t/g, ''),
        url
      }))
    }
  }
}
