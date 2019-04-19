import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { Subject } from 'rxjs/internal/Subject'
import { Subscribe } from 'src/modules/subscribe/interfaces'
import { SubscribeService } from 'src/modules/subscribe/services'
import { BotService } from '../../bot/services'
import { SiteService } from './site.service'

@Injectable()
export class ProcessService implements OnModuleInit {
  private readonly subscribesSubject: Subject<Subscribe[]> = new Subject()
  private processStatus: boolean = false

  constructor(
    private readonly subscribeService: SubscribeService,
    private readonly siteService: SiteService,
    private readonly botService: BotService
  ) {}

  async onModuleInit(): Promise<any> {
    const subscribes = await this.subscribeService.getMany()
    this.subscribesSubject.subscribe(this.start)
    this.subscribesSubject.next(subscribes)
  }

  changeProcessStatus(status: boolean = !this.processStatus) {
    Logger.log(`ProcessStatus changed to: %{status}`, 'ProcessService: changeProcessStatus')
    this.processStatus = status
  }

  async start(subscribes: Subscribe[]) {
    for (const subscribe of subscribes) {
      const newMessages = await this.siteService.getNewMessages(subscribe)

      Logger.log(
        `sub messages length: ${newMessages.length}; subscribe: ${subscribe}`,
        'ProcessService: start'
      )

      this.botService.pushMessages(newMessages)
    }
  }
}
