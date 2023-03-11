import {
  Column,
  DataType,
  Table,
  BelongsTo,
  Model,
  ForeignKey,
} from 'sequelize-typescript';
import { Artist } from 'src/artist/artist.model';

interface TrackCreationAttribute {
  artistId: number;
  name: string;
  audioPath: string;
  listens: number;
  imagePath: string;
}

@Table({ tableName: 'tracks' })
export class Track extends Model<Track, TrackCreationAttribute> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Artist)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  artistId: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  listens: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  audioPath: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  imagePath: string;

  @BelongsTo(() => Artist)
  artist: Artist;
}
