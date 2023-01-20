import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard'
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator'
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger/dist'
import {
  IAuthor,
  IAuthorRepository,
} from './../common/interfaces/author.interface'
import {
  Controller,
  Post,
  Patch,
  Delete,
  Get,
  Param,
  Body,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  FileTypeValidator,
  HttpCode,
  Req,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { AuthorDTO, AuthorUpdateDTO } from './dto/author.dto'
import { AuthorService } from './author.service'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import * as crypto from 'crypto'
import { Request } from 'express'
import { decodedUtil } from '../common/utils/decoded.util'

@ApiTags('authors')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('/api/v1/author')
export class AuthorController implements IAuthorRepository {
  constructor(private readonly authorService: AuthorService) {}

  @Post()
  @ApiOperation({
    summary: 'Create new author',
    description: 'Create new author',
  })
  create(
    @Req() request: Request,
    @Body() authorDTO: AuthorDTO,
  ): Promise<IAuthor> {
    const email = decodedUtil(request.headers.authorization)
    return this.authorService.create(email, authorDTO)
  }

  @Get()
  @ApiOperation({
    summary: 'Return a list authors',
    description: 'Return a list authors',
  })
  findAll(@Req() request: Request): Promise<IAuthor[]> {
    const email = decodedUtil(request.headers.authorization)
    return this.authorService.findAll(email)
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Return author',
    description: 'Return author',
  })
  findOne(@Param('id') id: string): Promise<IAuthor> {
    return this.authorService.findOne(id)
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update author',
    description: 'Update author',
  })
  update(
    @Param('id') id: string,
    @Body() authorUpdateDTO: AuthorUpdateDTO,
  ): Promise<IAuthor> {
    return this.authorService.update(id, authorUpdateDTO)
  }

  @Patch('/upload/:id')
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
  @ApiOperation({
    summary: 'Upload avatar author',
    description: 'Upload avatar author',
  })
  upload(
    @Param('id') id: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'image/jpeg' })],
      }),
    )
    file: Express.Multer.File,
  ): Promise<IAuthor> {
    return this.authorService.upload(id, file.filename)
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Delete author',
    description: 'Delete author',
  })
  delete(@Param('id') id: string): Promise<void> {
    return this.authorService.delete(id)
  }
}
