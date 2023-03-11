import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users/users.model';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/roles.model';
import { UserRole } from './roles/user-roles.model';
import { AuthModule } from './auth/auth.module';
import { Track } from './tracks/tracks.model';
import { TrackModule } from './tracks/tracks.module';
import { Artist } from './artist/artist.model';
import { ArtistModule } from './artist/artist.module';
import { UserTrack } from './tracks/user-tracks.model';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      models: [User, Role, UserRole, Track, Artist, UserTrack],
      autoLoadModels: true,
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    TrackModule,
    ArtistModule,
  ],
})
export class AppModule {}
