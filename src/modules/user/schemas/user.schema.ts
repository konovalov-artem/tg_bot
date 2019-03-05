import { Schema } from 'mongoose'

export const UserSchema = new Schema({
  firstName: String,
  telegramId: String,
  userName: String
})
