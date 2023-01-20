import { JwtService } from '@nestjs/jwt'
import { UserService } from './../user/user.service'
import { Injectable } from '@nestjs/common'
import { UserDTO } from 'src/user/dto/user.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(username)
    const isValidPassword = await this.userService.checkPassword(
      password,
      user.password,
    )

    if (user && isValidPassword) {
      return user
    }

    return null
  }

  async signIn(user: any) {
    const payload = {
      username: user.email,
      sub: user._id,
    }

    return {
      access_token: this.jwtService.sign(payload),
    }
  }

  async signUp(userDTO: UserDTO) {
    return this.userService.create(userDTO)
  }
}
