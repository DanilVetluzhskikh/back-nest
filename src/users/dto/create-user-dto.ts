import { IsString, Length, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Must be string' })
  @IsEmail({}, { message: 'incorrect email' })
  readonly email: string;

  @IsString({ message: 'Must be string' })
  @Length(4, 16, { message: '4 to 16 characters' })
  readonly password: string;
}
