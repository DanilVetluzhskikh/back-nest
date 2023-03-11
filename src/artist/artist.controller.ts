import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuth } from 'src/auth/jwt-auth.guard';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist-dto';

@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @UseGuards(JwtAuth)
  @Post('add')
  addTrack(@Body() createDto: CreateArtistDto) {
    return this.artistService.addTrack(createDto);
  }

  @UseGuards(JwtAuth)
  @Get('get')
  getTracks() {
    return this.artistService.getArtists();
  }
}
