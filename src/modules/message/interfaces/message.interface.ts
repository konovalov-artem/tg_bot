import { Document } from 'mongoose'

export interface Message extends Document {
  telegramId: number
  message: string
}
