import { Document } from 'mongoose'

export interface User extends Document {
  readonly firstName: string
  readonly telegramId: string
  readonly username: string
}
