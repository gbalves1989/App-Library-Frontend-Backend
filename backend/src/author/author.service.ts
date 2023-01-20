import { UserRepository } from './../common/repositories/user.repository'
import { IAuthor } from './../common/interfaces/author.interface'
import { AuthorDTO, AuthorUpdateDTO } from './dto/author.dto'
import { AuthorRepository } from './../common/repositories/author.repository'
import { Injectable } from '@nestjs/common'
import * as fs from 'fs'
import { join } from 'path'

@Injectable()
export class AuthorService {
  constructor(
    private readonly authorRepository: AuthorRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async create(email: string, authorDTO: AuthorDTO): Promise<IAuthor> {
    const { id } = await this.userRepository.findOne(email)
    return await this.authorRepository.create(id, authorDTO)
  }

  async findAll(email: string): Promise<IAuthor[]> {
    const { id } = await this.userRepository.findOne(email)
    return await this.authorRepository.findAll(id)
  }

  async findOne(id: string): Promise<IAuthor> {
    return await this.authorRepository.findOne(id)
  }

  async update(id: string, authorUpdateDTO: AuthorUpdateDTO): Promise<IAuthor> {
    return await this.authorRepository.update(id, authorUpdateDTO)
  }

  async upload(id: string, avatar: string): Promise<IAuthor> {
    const author = await this.authorRepository.findOne(id)

    if (author.avatar) {
      await fs.promises.unlink(
        join(__dirname, '..', '..', 'uploads', author.avatar),
      )
    }

    return await this.authorRepository.upload(id, avatar)
  }

  async delete(id: string): Promise<void> {
    const author = await this.authorRepository.findOne(id)

    if (author.avatar) {
      await fs.promises.unlink(
        join(__dirname, '..', '..', 'uploads', author.avatar),
      )
    }

    return await this.authorRepository.delete(id)
  }
}
