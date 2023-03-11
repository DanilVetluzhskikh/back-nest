import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { UsersService } from './users.service';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { GiveRoleDto } from './dto/give-role-dto';
import { BanUserDto } from './dto/ban-user-dto';
import { UnbanUserDto } from './dto/unban-user-dto';
import { ToggleTrackDto } from './dto/toggle-track-dto';
import { JwtAuth } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('create')
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get('get-all')
  getAll() {
    return this.usersService.getAllUsers();
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('give-role')
  giveRole(@Body() giveRole: GiveRoleDto) {
    return this.usersService.giveRole(giveRole);
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('ban')
  banUser(@Body() banDto: BanUserDto) {
    return this.usersService.banUser(banDto);
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('unban')
  unBan(@Body() unbanDto: UnbanUserDto) {
    return this.usersService.unBan(unbanDto);
  }

  @UseGuards(JwtAuth)
  @Post('add-track')
  addTrack(@Body() toggleDto: ToggleTrackDto) {
    return this.usersService.addTrack(toggleDto);
  }

  @UseGuards(JwtAuth)
  @Post('remove-track')
  removeTrack(@Body() toggleDto: ToggleTrackDto) {
    return this.usersService.removeTrack(toggleDto);
  }
}
