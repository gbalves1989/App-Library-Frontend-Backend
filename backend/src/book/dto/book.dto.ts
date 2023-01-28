import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, IsUUID } from 'class-validator'

export class BookDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly title: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly year: string

  @IsNotEmpty()
  @IsUUID()
  @ApiProperty()
  readonly authorId: string

  @IsNotEmpty()
  @IsUUID()
  @ApiProperty()
  readonly publisherId: string
}

export class UpdateBookDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly title: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly year: string
}
