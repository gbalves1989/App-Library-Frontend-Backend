import { Request } from 'express'
import { BookDTO, UpdateBookDTO } from './../../book/dto/book.dto'

export interface IBook {
  id: string
  title: string
  year: string
  Author: {}
  Publisher: {}
}

export interface IBookRepository {
  create(request: Request, bookDTO: BookDTO): Promise<IBook>
  findAll(request: Request): Promise<IBook[]>
  findOne(id: string): Promise<IBook>
  update(id: string, updateBookDTO: UpdateBookDTO): Promise<IBook>
  delete(id: string): Promise<void>
}
