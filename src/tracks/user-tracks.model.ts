import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/users/users.model';
import { Track } from './tracks.model';

@Table({ tableName: 'user_tracks', createdAt: false, updatedAt: false })
export class UserTrack extends Model<UserTrack> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Track)
  @Column({ type: DataType.INTEGER })
  trackId: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: string;
}
