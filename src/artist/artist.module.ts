import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { Track } from 'src/tracks/tracks.model';
import { ArtistController } from './artist.controller';
import { Artist } from './artist.model';
import { ArtistService } from './artist.service';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService],
  imports: [
    SequelizeModule.forFeature([Artist, Track]),
    forwardRef(() => AuthModule),
  ],
})
export class ArtistModule {}
