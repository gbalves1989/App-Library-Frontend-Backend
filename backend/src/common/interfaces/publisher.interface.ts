import { Request } from 'express'
import {
  PublisherDTO,
  PublisherUpdateDTO,
} from './../../publisher/dto/publisher.dto'

export interface IPublisher {
  id: string
  name: string
  Books: []
}

export interface IPublisherRepository {
  create(request: Request, publisherDTO: PublisherDTO): Promise<IPublisher>
  findAll(request: Request): Promise<IPublisher[]>
  findOne(id: string): Promise<IPublisher>
  update(
    id: string,
    publisherUpdateDTO: PublisherUpdateDTO,
  ): Promise<IPublisher>
  delete(id: string): Promise<void>
}
