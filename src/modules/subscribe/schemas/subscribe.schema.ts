import { Schema } from 'mongoose'

export const SubscribeSchema = new Schema(
  {
    chatId: String,
    title: String,
    url: String,
    source: String
  },
  { timestamps: true }
)
