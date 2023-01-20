import { Module } from '@nestjs/common'
import { UserModule } from './user/user.module'
import { ConfigModule } from '@nestjs/config'
import { AuthorModule } from './author/author.module'
import { PublisherModule } from './publisher/publisher.module'
import { BookModule } from './book/book.module'
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    UserModule,
    AuthorModule,
    PublisherModule,
    BookModule,
    AuthModule,
  ],
})
export class AppModule {}
