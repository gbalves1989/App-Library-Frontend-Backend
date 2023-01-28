import { UserRepository } from './../common/repositories/user.repository'
import { PrismaService } from './../common/database/prisma.database'
import { AuthorRepository } from './../common/repositories/author.repository'
import { Module } from '@nestjs/common'
import { AuthorController } from './author.controller'
import { AuthorService } from './author.service'

@Module({
  controllers: [AuthorController],
  providers: [AuthorService, AuthorRepository, UserRepository, PrismaService],
})
export class AuthorModule {}
