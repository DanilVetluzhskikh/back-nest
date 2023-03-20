import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTrackDto } from './dto/create-track-dto';
import { Track } from './tracks.model';
import * as fs from 'fs';
import * as path from 'path';
import * as uuuid from 'uuid';
import { FileService, FileType } from 'src/file/file.service';
import { AddListenDto } from './dto/add-listen-dto';

@Injectable()
export class TracksService {
  constructor(
    @InjectModel(Track) private trackRepository: typeof Track,
    private fileService: FileService,
  ) {}

  async create(dto: CreateTrackDto, picture, audio): Promise<Track> {
    const { artistId, name } = dto;

    const audioPath = this.fileService.createFile(FileType.AUDIO, audio);
    const imagePath = this.fileService.createFile(FileType.IMAGE, picture);

    const track = await this.trackRepository.create({
      name,
      artistId: Number(artistId),
      audioPath,
      imagePath,
      listens: 0,
    });

    const tracks = await this.getTracks();

    return tracks.find((item) => item.id === track.id);
  }

  async getTracks() {
    const tracks = await this.trackRepository.findAll({
      include: {
        all: true,
      },
    });

    return tracks;
  }

  async addListen(dto: AddListenDto) {
    const currentTrack = await this.trackRepository.findOne({
      where: {
        id: dto.id,
      },
    });

    if (currentTrack) {
      currentTrack.listens = currentTrack.listens + 1;

      currentTrack.save();

      return currentTrack;
    }

    throw new HttpException(
      'Error with write track',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  async createTrack(track): Promise<string> {
    try {
      const splitTrack = track.originalname.split('.');

      const format = splitTrack[splitTrack.length - 1];
      const trackName: string = uuuid.v4() + `.${format}` || '';

      const trackPath = path.resolve(__dirname, '..', 'static');

      if (!fs.existsSync(trackPath)) {
        fs.mkdirSync(trackPath, { recursive: true });
      }
      fs.writeFileSync(path.join(trackPath, trackName), track.buffer);
      return trackName;
    } catch (e) {
      throw new HttpException(
        'Error with write track',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
