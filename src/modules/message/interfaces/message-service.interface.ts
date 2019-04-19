import { Message } from './message.interface'

export interface IMessageService {
  getMany(): Promise<Message[]>
}
