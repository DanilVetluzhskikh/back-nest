import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RolesService } from 'src/roles/roles.service';
import { BanUserDto } from './dto/ban-user-dto';
import { CreateUserDto } from './dto/create-user-dto';
import { GiveRoleDto } from './dto/give-role-dto';
import { UnbanUserDto } from './dto/unban-user-dto';
import { User } from './users.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private rolesService: RolesService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    const role = await this.rolesService.getRoleByValue('USER');

    await user.$set('roles', [role.id]);
    user.roles = [role];

    return user;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll({
      include: {
        all: true,
      },
    });
    return users;
  }

  async getUserByLogin(login: string) {
    const user = await this.userRepository.findOne({
      where: {
        email: login,
      },
      include: {
        all: true,
      },
    });

    return user;
  }

  async giveRole(giveRole: GiveRoleDto) {
    const user = await this.getUserByLogin(giveRole.email);
    const role = await this.rolesService.getRoleByValue(giveRole.role);

    if (role && user) {
      await user.$add('role', role.id);
      return user;
    }

    throw new HttpException('User or role not found', HttpStatus.NOT_FOUND);
  }

  async banUser(banDto: BanUserDto) {
    const user = await this.getUserByLogin(banDto.email);

    if (user) {
      user.banReason = banDto.reason;
      user.banned = true;

      await user.save();

      return user;
    }

    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  async unBan(unbanDto: UnbanUserDto) {
    const user = await this.getUserByLogin(unbanDto.email);

    if (user) {
      user.banReason = '';
      user.banned = false;

      await user.save();

      return user;
    }

    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }
}
