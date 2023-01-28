import { AuthorSchema } from './../../author/schema/author.schema'
import { IAuthor } from './../interfaces/author.interface'
import { AuthorDTO, AuthorUpdateDTO } from './../../author/dto/author.dto'
import { PrismaService } from './../database/prisma.database'
import { Injectable } from '@nestjs/common'

@Injectable()
export class AuthorRepository {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, authorDTO: AuthorDTO): Promise<IAuthor> {
    const author = await this.prisma.author.create({
      data: { ...authorDTO, userId },
      select: AuthorSchema,
    })

    return author as IAuthor
  }

  async findAll(userId: string): Promise<IAuthor[]> {
    const authors = await this.prisma.author.findMany({
      where: { userId },
      select: AuthorSchema,
    })

    return authors as IAuthor[]
  }

  async findOne(id: string): Promise<IAuthor> {
    const author = await this.prisma.author.findFirst({
      where: { id },
      select: AuthorSchema,
    })

    return author as IAuthor
  }

  async update(id: string, authorUpdateDTO: AuthorUpdateDTO): Promise<IAuthor> {
    const author = await this.prisma.author.update({
      where: { id },
      data: { ...authorUpdateDTO },
      select: AuthorSchema,
    })

    return author as IAuthor
  }

  async upload(id: string, avatar: string): Promise<IAuthor> {
    const author = await this.prisma.author.update({
      where: { id },
      data: { avatar },
      select: AuthorSchema,
    })

    return author as IAuthor
  }

  async delete(id: string): Promise<void> {
    await this.prisma.author.delete({ where: { id } })
  }
}
