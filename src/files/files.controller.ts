import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuth } from 'src/auth/jwt-auth.guard';
import { CreateFileDto } from './dto/create-file-dto';
import { FilesService } from './files.service';

@ApiTags('Files')
@Controller('files')
export class FilesController {
  constructor(private filesService: FilesService) {}

  @UseGuards(JwtAuth)
  @Post('add')
  @UseInterceptors(FileInterceptor('file'))
  addFile(@Body() createDto: CreateFileDto, @UploadedFile() file) {
    return this.filesService.addFile(createDto, file);
  }

  @UseGuards(JwtAuth)
  @Get('get')
  getFiles(@Headers() headers) {
    return this.filesService.getFiles(headers);
  }
}
