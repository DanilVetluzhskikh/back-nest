import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { GiveRoleDto } from './dto/give-role-dto';
import { BanUserDto } from './dto/ban-user-dto';
import { UnbanUserDto } from './dto/unban-user-dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 200, type: User })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/create')
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: Array<User> })
  @Roles('USER')
  @UseGuards(RolesGuard)
  @Get('get-all')
  getAll() {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({ summary: 'Give role for user' })
  @ApiResponse({ status: 200, type: User })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('give-role')
  giveRole(@Body() giveRole: GiveRoleDto) {
    return this.usersService.giveRole(giveRole);
  }

  @ApiOperation({ summary: 'Ban user' })
  @ApiResponse({ status: 200, type: User })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('ban')
  banUser(@Body() banDto: BanUserDto) {
    return this.usersService.banUser(banDto);
  }

  @ApiOperation({ summary: 'Unban user' })
  @ApiResponse({ status: 200, type: User })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('unban')
  unBan(@Body() unbanDto: UnbanUserDto) {
    return this.usersService.unBan(unbanDto);
  }
}
