import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateFileDto {
  @ApiProperty({ example: 'name_secname@mail.ru', description: 'Your email' })
  @IsNumber({}, { message: 'Must be number' })
  readonly userId: number;
}
