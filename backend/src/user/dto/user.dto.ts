import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, IsEmail } from 'class-validator'

export class UserDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly name: string

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  readonly email: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly password: string
}

export class UserUpdateDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly name: string
}
