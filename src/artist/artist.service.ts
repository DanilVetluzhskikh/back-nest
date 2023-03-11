import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Artist } from './artist.model';
import { CreateArtistDto } from './dto/create-artist-dto';

@Injectable()
export class ArtistService {
  constructor(@InjectModel(Artist) private artistRepostory: typeof Artist) {}

  async addTrack(createDto: CreateArtistDto) {
    const { name } = createDto;

    const currentArtist = await this.artistRepostory.findOne({
      where: {
        name,
      },
    });

    if (currentArtist) {
      throw new HttpException(
        'Исполнитель с таким именем уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.artistRepostory.create({
      name,
    });
  }

  async getArtists() {
    const artists = await this.artistRepostory.findAll();

    return artists;
  }
}
