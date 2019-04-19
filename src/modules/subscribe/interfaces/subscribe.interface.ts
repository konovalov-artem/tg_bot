import { Document } from 'mongoose'
import { SiteType } from 'src/modules/site/interfaces'

export interface Subscribe extends Document {
  telegramId: number,
  title: string,
  url: string,
  source: string
  siteType: SiteType
  advData: string[]
}
