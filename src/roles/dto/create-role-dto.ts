import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateRoleDto {
  @IsString({ message: 'Must be string' })
  @ApiProperty({ example: 'ADMIN', description: 'Name of role' })
  readonly value: string;

  @IsString({ message: 'Must be string' })
  @ApiProperty({
    example: 'Admin role for ...',
    description: 'Description of role',
  })
  readonly description: string;
}
