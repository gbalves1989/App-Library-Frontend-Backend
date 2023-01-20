import { Request } from 'express'
import { AuthorDTO, AuthorUpdateDTO } from './../../author/dto/author.dto'

export interface IAuthor {
  id: string
  name: string
  avatar: string
  Books: []
}

export interface IAuthorRepository {
  create(request: Request, authorDTO: AuthorDTO): Promise<IAuthor>
  findAll(request: Request): Promise<IAuthor[]>
  findOne(id: string): Promise<IAuthor>
  update(id: string, authorUpdateDTO: AuthorUpdateDTO): Promise<IAuthor>
  upload(id: string, file: Express.Multer.File): Promise<IAuthor>
  delete(id: string): Promise<void>
}
