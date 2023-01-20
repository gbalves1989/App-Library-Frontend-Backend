import { Request } from 'express'
import { UserUpdateDTO } from './../../user/dto/user.dto'

export interface IUser {
  id: string
  name: string
  email: string
  avatar: string
  Author: []
  Publisher: []
  Book: []
}

export interface IUserPass {
  id: string
  name: string
  email: string
  password: string
  avatar: string
  Author: []
  Publisher: []
  Book: []
}

export interface Payload {
  username: string
}

export interface IUserRepository {
  findOne(request: Request): Promise<IUser>
  update(request: Request, userUpdateDTO: UserUpdateDTO): Promise<IUser>
  upload(request: Request, file: Express.Multer.File): Promise<IUser>
}
