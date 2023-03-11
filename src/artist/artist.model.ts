import { HasMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { Track } from 'src/tracks/tracks.model';

interface ArtistCreationAttribute {
  name: string;
}

@Table({ tableName: 'artist' })
export class Artist extends Model<Artist, ArtistCreationAttribute> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @HasMany(() => Track)
  tracks: Track[];
}
