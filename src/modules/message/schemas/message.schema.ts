import { Schema } from 'mongoose'

export const MessageSchema = new Schema(
  {
    telegramId: Number,
    message: String
  },
  {
    timestamps: true
  }
)
