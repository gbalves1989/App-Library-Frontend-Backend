import { TimeOutInterceptor } from './common/interceptors/timeout.interceptor'
import { AllExceptionFilter } from './common/filters/http-exception.filter'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder } from '@nestjs/swagger'
import { SwaggerModule } from '@nestjs/swagger/dist'
import { ValidationPipe } from '@nestjs/common'
import { join } from 'path'
import { NestExpressApplication } from '@nestjs/platform-express'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  })
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalFilters(new AllExceptionFilter())
  app.useGlobalInterceptors(new TimeOutInterceptor())

  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/files/',
  })

  const options = new DocumentBuilder()
    .setTitle('AppLibrary API')
    .setDescription('Biblioteca de livros')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, options)

  SwaggerModule.setup('/api/docs', app, document, {
    swaggerOptions: {
      filter: true,
    },
  })

  await app.listen(process.env.PORT || 3000)
}
bootstrap()
