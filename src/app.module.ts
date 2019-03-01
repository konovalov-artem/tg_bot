import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule, ConfigService } from 'nestjs-config'
import { resolve } from 'path'

@Module({
  imports: [
    ConfigModule.load(
      resolve(__dirname, '**/*/!(*.d).config.{ts,js}'),
      {
        modifyConfigName: (name: string) => name.replace('.config', ''),
        path: `config.env`
      }
    ),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => configService.get('database'),
      inject: [ConfigService]
    })
  ]
})
export class AppModule {}
