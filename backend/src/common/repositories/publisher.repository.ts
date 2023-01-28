import { PrismaService } from './../database/prisma.database'
import { PublisherSchema } from './../../publisher/schema/publisher.schema'
import { IPublisher } from '../interfaces/publisher.interface'
import {
  PublisherDTO,
  PublisherUpdateDTO,
} from './../../publisher/dto/publisher.dto'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PublisherRepository {
  constructor(private prisma: PrismaService) {}

  async create(
    userId: string,
    publisherDTO: PublisherDTO,
  ): Promise<IPublisher> {
    const publisher = await this.prisma.publisher.create({
      data: { ...publisherDTO, userId },
      select: PublisherSchema,
    })

    return publisher as IPublisher
  }

  async findAll(userId: string): Promise<IPublisher[]> {
    const publishers = await this.prisma.publisher.findMany({
      where: { userId },
      select: PublisherSchema,
    })

    return publishers as IPublisher[]
  }

  async findOne(id: string): Promise<IPublisher> {
    const publisher = await this.prisma.publisher.findFirst({
      where: { id },
      select: PublisherSchema,
    })

    return publisher as IPublisher
  }

  async update(
    id: string,
    publisherUpdateDTO: PublisherUpdateDTO,
  ): Promise<IPublisher> {
    const publisher = await this.prisma.publisher.update({
      where: { id },
      data: { ...publisherUpdateDTO },
      select: PublisherSchema,
    })

    return publisher as IPublisher
  }

  async delete(id: string): Promise<void> {
    await this.prisma.publisher.delete({ where: { id } })
  }
}
