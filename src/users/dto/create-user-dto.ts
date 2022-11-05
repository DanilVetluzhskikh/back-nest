import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsEmail } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'name_secname@mail.ru', description: 'Your email' })
  @IsString({ message: 'Must be string' })
  @IsEmail({}, { message: 'incorrect email' })
  readonly email: string;

  @ApiProperty({ example: 'H4rdP$ssword', description: 'Your password' })
  @IsString({ message: 'Must be string' })
  @Length(4, 16, { message: '4 to 16 characters' })
  readonly password: string;
}
