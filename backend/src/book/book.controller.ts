import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard'
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator'
import { ApiBearerAuth } from '@nestjs/swagger/dist'
import { BookService } from './book.service'
import { IBook, IBookRepository } from './../common/interfaces/book.interface'
import {
  Controller,
  Post,
  Get,
  Delete,
  Patch,
  Param,
  Body,
  Req,
} from '@nestjs/common'
import { BookDTO, UpdateBookDTO } from './dto/book.dto'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { HttpCode } from '@nestjs/common/decorators'
import { Request } from 'express'
import { decodedUtil } from '../common/utils/decoded.util'

@ApiTags('books')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('/api/v1/book')
export class BookController implements IBookRepository {
  constructor(private readonly bookService: BookService) {}

  @Post()
  @ApiOperation({
    summary: 'Create new book',
    description: 'Create new book',
  })
  create(@Req() request: Request, @Body() bookDTO: BookDTO): Promise<IBook> {
    const email = decodedUtil(request.headers.authorization)
    return this.bookService.create(email, bookDTO)
  }

  @Get()
  @ApiOperation({
    summary: 'Return list book',
    description: 'Return list book',
  })
  findAll(@Req() request: Request): Promise<IBook[]> {
    const email = decodedUtil(request.headers.authorization)
    return this.bookService.findAll(email)
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Return book',
    description: 'Return book',
  })
  findOne(@Param('id') id: string): Promise<IBook> {
    return this.bookService.findOne(id)
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update book',
    description: 'Update book',
  })
  update(
    @Param('id') id: string,
    @Body() updateBookDTO: UpdateBookDTO,
  ): Promise<IBook> {
    return this.bookService.update(id, updateBookDTO)
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete book',
    description: 'Delete book',
  })
  @HttpCode(204)
  delete(@Param('id') id: string): Promise<void> {
    return this.bookService.delete(id)
  }
}
