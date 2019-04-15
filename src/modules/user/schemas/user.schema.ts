import { Schema } from 'mongoose'

export const UserSchema = new Schema(
  {
    firstName: String,
    telegramId: Number,
    userName: String,
    pending: Boolean
  },
  {
    timestamps: true
  }
)
