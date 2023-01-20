import { JwtService } from '@nestjs/jwt'
import { PrismaService } from './../common/database/prisma.database'
import { UserRepository } from '../common/repositories/user.repository'
import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository, PrismaService, JwtService],
  exports: [UserService],
})
export class UserModule {}
