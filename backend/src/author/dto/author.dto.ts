import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class AuthorDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly name: string
}

export class AuthorUpdateDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string
}
