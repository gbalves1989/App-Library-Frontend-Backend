import { IUser, IUserPass } from './../common/interfaces/user.interface'
import { UserDTO, UserUpdateDTO } from './dto/user.dto'
import { UserRepository } from '../common/repositories/user.repository'
import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { BadRequestException } from '@nestjs/common/exceptions'
import * as fs from 'fs'
import { join } from 'path'

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
  }

  async create(userDTO: UserDTO): Promise<IUser> {
    const user = await this.userRepository.findByEmail(userDTO.email)

    if (user) {
      throw new BadRequestException('E-mail já esta cadastrado.')
    }

    const hash = await this.hashPassword(userDTO.password)
    return await this.userRepository.create(userDTO, hash)
  }

  async findAll(): Promise<IUser[]> {
    return await this.userRepository.findAll()
  }

  async findOne(email: string): Promise<IUser> {
    return await this.userRepository.findOne(email)
  }

  async findByEmail(email: string): Promise<IUserPass> {
    return await this.userRepository.findByEmail(email)
  }

  async update(email: string, userUpdateDTO: UserUpdateDTO): Promise<IUser> {
    const { id } = await this.userRepository.findOne(email)
    return await this.userRepository.update(id, userUpdateDTO)
  }

  async upload(email: string, file: string): Promise<IUser> {
    const { id, avatar } = await this.userRepository.findOne(email)

    if (avatar) {
      await fs.promises.unlink(join(__dirname, '..', '..', 'uploads', avatar))
    }

    return await this.userRepository.upload(id, file)
  }

  async checkPassword(password: string, passwordDB: string): Promise<string> {
    return await bcrypt.hash(password, passwordDB)
  }
}
