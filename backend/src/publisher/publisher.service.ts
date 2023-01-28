import { UserRepository } from './../common/repositories/user.repository'
import { IPublisher } from 'src/common/interfaces/publisher.interface'
import { PublisherDTO, PublisherUpdateDTO } from './dto/publisher.dto'
import { PublisherRepository } from './../common/repositories/publisher.repository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PublisherService {
  constructor(
    private readonly publisherRepository: PublisherRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async create(email: string, publisherDTO: PublisherDTO): Promise<IPublisher> {
    const { id } = await this.userRepository.findOne(email)
    return await this.publisherRepository.create(id, publisherDTO)
  }

  async findAll(email: string): Promise<IPublisher[]> {
    const { id } = await this.userRepository.findOne(email)
    return await this.publisherRepository.findAll(id)
  }

  async findOne(id: string): Promise<IPublisher> {
    return await this.publisherRepository.findOne(id)
  }

  async update(
    id: string,
    publisherDTO: PublisherUpdateDTO,
  ): Promise<IPublisher> {
    return await this.publisherRepository.update(id, publisherDTO)
  }

  async delete(id: string): Promise<void> {
    await this.publisherRepository.delete(id)
  }
}
