import { UserPassSchema, UserSchema } from './../../user/schema/user.schema'
import { IUser, IUserPass } from './../interfaces/user.interface'
import { UserDTO, UserUpdateDTO } from './../../user/dto/user.dto'
import { PrismaService } from './../database/prisma.database'
import { Injectable } from '@nestjs/common'

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async create({ name, email }: UserDTO, password: string): Promise<IUser> {
    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        password,
      },
      select: UserSchema,
    })

    return user as IUser
  }

  async findOne(email: string): Promise<IUser> {
    const user = await this.prisma.user.findFirst({
      where: { email },
      select: UserSchema,
    })

    return user as IUser
  }

  async findAll(): Promise<IUser[]> {
    const users = await this.prisma.user.findMany({
      select: UserSchema,
    })

    return users as IUser[]
  }

  async findByEmail(email: string): Promise<IUserPass> {
    const user = await this.prisma.user.findFirst({
      where: { email },
      select: UserPassSchema,
    })

    return user as IUserPass
  }

  async update(id: string, userUpdateDTO: UserUpdateDTO): Promise<IUser> {
    const user = await this.prisma.user.update({
      where: { id },
      data: { ...userUpdateDTO },
      select: UserSchema,
    })

    return user as IUser
  }

  async upload(id: string, avatar: string): Promise<IUser> {
    const user = await this.prisma.user.update({
      where: { id },
      data: { avatar },
      select: UserSchema,
    })

    return user as IUser
  }
}
