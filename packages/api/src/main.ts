import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors({
    origin: [
      'http://localhost:5173',
      'http://localhost:3000',
      process.env.URL_FRONTEND,
    ],
    credentials: true,
  })

  app.useGlobalPipes(new ValidationPipe())

  await app.listen(8000)
  console.info(`Server is running on: ${await app.getUrl()}`)
  console.info(`Server is running on: ${await app.getUrl()}/graphql`)
}
bootstrap()
