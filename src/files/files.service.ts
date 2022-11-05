import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateFileDto } from './dto/create-file-dto';
import { File } from './files.model';
import { JwtService } from '@nestjs/jwt';
import * as fs from 'fs';
import * as path from 'path';
import * as uuuid from 'uuid';
import { User } from 'src/users/users.model';

@Injectable()
export class FilesService {
  constructor(
    @InjectModel(File) private fileRepository: typeof File,
    private jwtService: JwtService,
  ) {}

  async addFile(createDto: CreateFileDto, file) {
    const fileName = await this.createFile(file);

    const currentFile = await this.fileRepository.create({
      userId: createDto.userId,
      name: fileName,
      originalName: file.originalname,
    });

    return currentFile;
  }
  async getFiles(headers) {
    const token = headers.authorization.split(' ')[1];

    const { id } = this.jwtService.decode(token) as User;

    const files = await this.fileRepository.findAll({
      where: {
        userId: id,
      },
    });

    return files;
  }

  async createFile(file): Promise<string> {
    try {
      const splitFile = file.originalname.split('.');

      const format = splitFile[splitFile.length - 1];
      const fileName: string = uuuid.v4() + `.${format}` || '';

      const filePath = path.resolve(__dirname, '..', 'static');

      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.join(filePath, fileName), file.buffer);
      return fileName;
    } catch (e) {
      throw new HttpException(
        'Error with write file',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
