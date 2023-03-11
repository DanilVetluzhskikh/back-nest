import { IsString, IsEmail } from 'class-validator';

export class UnbanUserDto {
  @IsString({ message: 'Must be string' })
  @IsEmail({}, { message: 'incorrect email' })
  readonly email: string;
}
