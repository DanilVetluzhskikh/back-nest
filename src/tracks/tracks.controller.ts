import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { JwtAuth } from 'src/auth/jwt-auth.guard';
import { CreateTrackDto } from './dto/create-track-dto';
import { TracksService } from './tracks.service';

@Controller('tracks')
export class TracksController {
  constructor(private tracksService: TracksService) {}

  @Post('/add')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'picture', maxCount: 1 },
      { name: 'audio', maxCount: 1 },
    ]),
  )
  create(@Body() dto: CreateTrackDto, @UploadedFiles() files) {
    const { picture, audio } = files;

    return this.tracksService.create(dto, picture[0], audio[0]);
  }

  @UseGuards(JwtAuth)
  @Get('get')
  getTracks() {
    return this.tracksService.getTracks();
  }
}
