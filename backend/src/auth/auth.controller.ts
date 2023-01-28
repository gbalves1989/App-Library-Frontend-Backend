import { Controller, Post, Body, Req } from '@nestjs/common'
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { UserDTO } from 'src/user/dto/user.dto'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { AuthService } from './auth.service'

@ApiTags('Authentication')
@Controller('/api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  @ApiOperation({
    summary: 'User login',
    description: 'Return a token valid',
  })
  async signIn(@Req() req) {
    return await this.authService.signIn(req.user)
  }

  @Post('signup')
  @ApiOperation({
    summary: 'Create a new user',
    description: 'Create a new user',
  })
  async signUp(@Body() userDTO: UserDTO) {
    return await this.authService.signUp(userDTO)
  }
}
