import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard'
import { UserService } from './user.service'
import { IUser, IUserRepository } from './../common/interfaces/user.interface'
import {
  Controller,
  Get,
  Patch,
  Body,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  FileTypeValidator,
  UseGuards,
  Req,
} from '@nestjs/common'
import { UserUpdateDTO } from './dto/user.dto'
import { diskStorage } from 'multer'
import * as crypto from 'crypto'
import { FileInterceptor } from '@nestjs/platform-express'
import { Express, Request } from 'express'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger/dist'
import { decodedUtil } from '../common/utils/decoded.util'

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('/api/v1/user')
export class UserController implements IUserRepository {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @ApiOperation({
    summary: 'Return user',
    description: 'Return user',
  })
  findOne(@Req() request: Request): Promise<IUser> {
    const email = decodedUtil(request.headers.authorization)
    return this.userService.findOne(email)
  }

  @Patch()
  @ApiOperation({
    summary: 'Update user',
    description: 'Update user',
  })
  update(
    @Req() request: Request,
    @Body() userUpdateDTO: UserUpdateDTO,
  ): Promise<IUser> {
    const email = decodedUtil(request.headers.authorization)
    return this.userService.update(email, userUpdateDTO)
  }

  @Patch('/upload')
  @ApiOperation({
    summary: 'Upload avatar',
    description: 'Upload avatar',
  })
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const fileHash = crypto.randomBytes(16).toString('hex')
          const filename = `${fileHash}-${file.originalname}`

          return callback(null, filename)
        },
      }),
    }),
  )
  upload(
    @Req() request: Request,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'image/jpeg' })],
      }),
    )
    file: Express.Multer.File,
  ): Promise<IUser> {
    const email = decodedUtil(request.headers.authorization)
    return this.userService.upload(email, file.filename)
  }
}
