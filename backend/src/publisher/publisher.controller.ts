import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard'
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator'
import { PublisherService } from './publisher.service'
import {
  IPublisher,
  IPublisherRepository,
} from './../common/interfaces/publisher.interface'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger/dist'
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Req,
} from '@nestjs/common'
import { PublisherDTO, PublisherUpdateDTO } from './dto/publisher.dto'
import { HttpCode } from '@nestjs/common/decorators'
import { Request } from 'express'
import { decodedUtil } from '../common/utils/decoded.util'

@ApiTags('publishers')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('/api/v1/publisher')
export class PublisherController implements IPublisherRepository {
  constructor(private readonly publisherService: PublisherService) {}

  @Post()
  @ApiOperation({
    summary: 'Create new publisher',
    description: 'Create new publisher',
  })
  create(
    @Req() request: Request,
    @Body() publisherDTO: PublisherDTO,
  ): Promise<IPublisher> {
    const email = decodedUtil(request.headers.authorization)
    return this.publisherService.create(email, publisherDTO)
  }

  @Get()
  @ApiOperation({
    summary: 'Return list publisher',
    description: 'Return list publisher',
  })
  findAll(@Req() request: Request): Promise<IPublisher[]> {
    const email = decodedUtil(request.headers.authorization)
    return this.publisherService.findAll(email)
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Return publisher',
    description: 'Return publisher',
  })
  findOne(@Param('id') id: string): Promise<IPublisher> {
    return this.publisherService.findOne(id)
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update publisher',
    description: 'Update publisher',
  })
  update(
    @Param('id') id: string,
    @Body() publisherUpdateDTO: PublisherUpdateDTO,
  ): Promise<IPublisher> {
    return this.publisherService.update(id, publisherUpdateDTO)
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Delete publisher',
    description: 'Delete publisher',
  })
  delete(@Param('id') id: string): Promise<void> {
    return this.publisherService.delete(id)
  }
}
