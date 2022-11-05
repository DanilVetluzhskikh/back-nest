import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/users/users.model';
import { UsersModule } from 'src/users/users.module';
import { FilesController } from './files.controller';
import { File } from './files.model';
import { FilesService } from './files.service';

@Module({
  controllers: [FilesController],
  providers: [FilesService],
  imports: [
    SequelizeModule.forFeature([User, File]),
    UsersModule,
    forwardRef(() => AuthModule),
  ],
})
export class FileModule {}
