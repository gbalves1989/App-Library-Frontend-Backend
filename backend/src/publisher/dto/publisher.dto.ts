import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class PublisherDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly name: string
}

export class PublisherUpdateDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly name: string
}
