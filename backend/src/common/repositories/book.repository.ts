import { BookSchema } from './../../book/schema/book.schema'
import { IBook } from './../interfaces/book.interface'
import { BookDTO, UpdateBookDTO } from './../../book/dto/book.dto'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../database/prisma.database'

@Injectable()
export class BookRepository {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, bookDTO: BookDTO): Promise<IBook> {
    const book = await this.prisma.book.create({
      data: { ...bookDTO, userId },
      select: BookSchema,
    })

    return book as IBook
  }

  async findAll(userId: string): Promise<IBook[]> {
    const books = await this.prisma.book.findMany({
      where: { userId },
      select: BookSchema,
    })

    return books as IBook[]
  }

  async findOne(id: string): Promise<IBook> {
    const book = await this.prisma.book.findFirst({
      where: { id },
      select: BookSchema,
    })

    return book as IBook
  }

  async update(id: string, { title, year }: UpdateBookDTO): Promise<IBook> {
    const book = await this.prisma.book.update({
      where: { id },
      data: { title, year },
      select: BookSchema,
    })

    return book as IBook
  }

  async delete(id: string): Promise<void> {
    await this.prisma.book.delete({ where: { id } })
  }
}
