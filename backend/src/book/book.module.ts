import { UserRepository } from './../common/repositories/user.repository'
import { PrismaService } from './../common/database/prisma.database'
import { BookRepository } from './../common/repositories/book.repository'
import { BookController } from './book.controller'
import { Module } from '@nestjs/common'
import { BookService } from './book.service'

@Module({
  providers: [BookService, BookRepository, UserRepository, PrismaService],
  controllers: [BookController],
})
export class BookModule {}
