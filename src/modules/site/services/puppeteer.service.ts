import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { omit } from 'lodash'
import puppeteer, { Browser, Page } from 'puppeteer'
import URL from 'url'
import { PageEvaluateArgumentsInterface } from '../interfaces'

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

  async pageEvaluate(args: PageEvaluateArgumentsInterface): Promise<any | { link: string; title: string }> {
    return this.page.evaluateHandle(
      (selectors: PageEvaluateArgumentsInterface) => {
        const { advertSelector, linkSelector, titleSelector } = selectors

        return document
          .querySelectorAll<HTMLDivElement>(advertSelector)
          .forEach((advert: HTMLDivElement) => {
            return {
              link: advert.querySelector<HTMLLinkElement>(linkSelector).href,
              title: advert.querySelector(titleSelector).innerHTML
            }
        })
      },
      JSON.stringify(args)
    )
  }

  getNextPageUrl(): string {
    const parsedUrl = omit(URL.parse(this.page.url(), true), ['search'])

    // TODO: !!!!

    // parsedUrl.query[this.attributes.pageAttr]
    Logger.log(
      `Before: ${this.page.url()};
      After: ${URL.format(parsedUrl)}`,
      'PuppeteerService: getNextPageUrl'
    )

    return URL.format(parsedUrl)
  }

  goToNextPageUrl() {
    console.log('1')
  }
}
