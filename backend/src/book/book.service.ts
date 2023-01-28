import { UserRepository } from './../common/repositories/user.repository'
import { IBook } from './../common/interfaces/book.interface'
import { BookDTO, UpdateBookDTO } from './dto/book.dto'
import { BookRepository } from './../common/repositories/book.repository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class BookService {
  constructor(
    private readonly bookRepository: BookRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async create(email: string, bookDTO: BookDTO): Promise<IBook> {
    const { id } = await this.userRepository.findOne(email)
    return await this.bookRepository.create(id, bookDTO)
  }

  async findAll(email: string): Promise<IBook[]> {
    const { id } = await this.userRepository.findOne(email)
    return await this.bookRepository.findAll(id)
  }

  async findOne(id: string): Promise<IBook> {
    return await this.bookRepository.findOne(id)
  }

  async update(id: string, updateBookDTO: UpdateBookDTO): Promise<IBook> {
    return await this.bookRepository.update(id, updateBookDTO)
  }

  async delete(id: string): Promise<void> {
    return await this.bookRepository.delete(id)
  }
}
