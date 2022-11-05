import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';

export class UnbanUserDto {
  @IsString({ message: 'Must be string' })
  @IsEmail({}, { message: 'incorrect email' })
  @ApiProperty({
    example: 'name_secname@mail.ru',
    description: 'Email user',
  })
  readonly email: string;
}
