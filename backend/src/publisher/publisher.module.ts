import { UserRepository } from './../common/repositories/user.repository'
import { PrismaService } from './../common/database/prisma.database'
import { PublisherRepository } from './../common/repositories/publisher.repository'
import { Module } from '@nestjs/common'
import { PublisherService } from './publisher.service'
import { PublisherController } from './publisher.controller'

@Module({
  providers: [
    PublisherService,
    PublisherRepository,
    UserRepository,
    PrismaService,
  ],
  controllers: [PublisherController],
})
export class PublisherModule {}
