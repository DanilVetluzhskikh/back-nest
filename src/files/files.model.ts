import {
  Column,
  DataType,
  Table,
  BelongsTo,
  Model,
  ForeignKey,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/users.model';

interface FileCreationAttribute {
  userId: number;
  name: string;
  originalName: string;
}

@Table({ tableName: 'files' })
export class File extends Model<File, FileCreationAttribute> {
  @ApiProperty({ example: '1', description: 'Uniq identifier' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @ApiProperty({ example: 'ofmsafjmdsa3.png', description: 'File name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({ example: 'photo.png', description: 'Original file name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  originalName: string;

  @BelongsTo(() => User)
  author: User;
}
