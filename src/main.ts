// # Promise fix from https://github.com/yagop/node-telegram-bot-api/issues/319
process.env.NTBA_FIX_319 = '1'
import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { ConfigService } from 'nestjs-config'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)
  const { port, nodeEnv } = configService.get('bootstrap')

  await app.listen(port)

  Logger.log(`Server running on http://localhost:${port}`, 'Bootstrap')

  return nodeEnv
}
bootstrap()
  .then((env: string) => {
      Logger.log(`🚀 Started at "${env}" mode!`, 'Bootstrap')
  })
  .catch((error: Error) => {
      Logger.error('Unhandled Rejection', error.stack, 'Bootstrap')
  })
