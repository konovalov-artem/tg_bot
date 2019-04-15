import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { omit } from 'lodash'
import puppeteer, { Browser, Page } from 'puppeteer'
import URL from 'url'
import { PageEvaluateArgumentsInterface } from '../interfaces/page-evaluate-arguments.interface'

@Injectable()
export class PuppeteerService implements OnModuleInit {
  private browser: Browser
  private page: Page

  async onModuleInit() {
    this.browser = await puppeteer.launch({ headless: true })

    this.page = await this.browser.newPage()
  }

  async gotToUrl(url: string) {
    await this.page.goto(url)
  }

  async pageEvaluate(args: PageEvaluateArgumentsInterface): Promise<any> {
    return this.page.evaluateHandle(
      (selectors: PageEvaluateArgumentsInterface) => {
        const { advertSelector, linkSelector, titleSelector } = selectors

        const adverts = document.querySelectorAll<HTMLDivElement>(advertSelector)

        return adverts.forEach((advert: HTMLDivElement) => {
          return {
            link: advert.querySelector<HTMLLinkElement>(linkSelector).href,
            title: advert.querySelector(titleSelector).innerHTML
          }
        })
      },
      JSON.stringify(args))
  }

  getNextPageUrl(): string {
    const parsedUrl = omit(URL.parse(this.page.url(), true), ['search'])

    this.currentPage += 1
    parsedUrl.query[this.attributes.pageAttr] = this.currentPage
    Logger.log(
      `Before: ${this.page.url()};
      After: ${URL.format(parsedUrl)}`,
      'PuppeteerService: getNextPageUrl'
    )

    return URL.format(parsedUrl)
  }
}
