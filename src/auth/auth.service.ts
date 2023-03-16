import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user-dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/users.model';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(user: CreateUserDto) {
    const currentUser = await this.validateUser(user);

    const token = await this.generateToken(currentUser);

    return {
      token,
      roles: currentUser.roles.map((item) => item.value),
    };
  }

  async registration(user: CreateUserDto) {
    const candidate = await this.userService.getUserByLogin(user.email);

    if (candidate) {
      throw new HttpException(
        'Пользователь с таким email уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await bcrypt.hash(user.password, 5);
    const newUser = await this.userService.createUser({
      ...user,
      password: hashPassword,
    });

    const token = await this.generateToken(newUser);

    return {
      token,
      roles: newUser.roles.map((item) => item.value),
    };
  }

  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id, roles: user.roles };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(user: CreateUserDto) {
    const currentUser = await this.userService.getUserByLogin(user.email);
    const isPasswordEquals = await bcrypt.compare(
      user.password,
      currentUser?.password || '',
    );

    if (currentUser.banned) {
      throw new UnauthorizedException(
        `Пользователь забанен по причине: ${currentUser.banReason}`,
      );
    }

    if (!isPasswordEquals || !currentUser) {
      throw new UnauthorizedException('Неверный логин или пароль');
    }

    return currentUser;
  }
}
