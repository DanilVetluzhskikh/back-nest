import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Artist } from 'src/artist/artist.model';
import { ArtistModule } from 'src/artist/artist.module';
import { AuthModule } from 'src/auth/auth.module';
import { FileService } from 'src/file/file.service';
import { TracksController } from './tracks.controller';
import { Track } from './tracks.model';
import { TracksService } from './tracks.service';

@Module({
  controllers: [TracksController],
  providers: [TracksService, FileService],
  imports: [
    SequelizeModule.forFeature([Artist, Track]),
    ArtistModule,
    forwardRef(() => AuthModule),
  ],
})
export class TrackModule {}
