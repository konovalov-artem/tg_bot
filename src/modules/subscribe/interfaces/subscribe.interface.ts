import { Document } from 'mongoose'

export interface Subscribe extends Document {
  chatId: string,
  title: string,
  url: string,
  source: string
}
