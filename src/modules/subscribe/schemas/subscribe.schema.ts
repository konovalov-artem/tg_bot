import { Schema } from 'mongoose'

export const SubscribeSchema = new Schema(
  {
    chatId: String,
    title: String,
    url: String,
    source: String,
    advData: [String]
  },
  { timestamps: true }
)
