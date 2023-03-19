import { IsString, IsEmail } from 'class-validator';

export class GiveRoleDto {
  @IsString({ message: 'Must be string' })
  @IsEmail({}, { message: 'incorrect email' })
  readonly email: string;

  readonly roles: string[];
}
