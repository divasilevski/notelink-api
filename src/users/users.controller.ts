import { Controller, Get, Param, Put, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth-jwt.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getUsers() {
    return this.usersService.getAll();
  }

  @Get(':id')
  getUser(@Param('id') id) {
    return this.usersService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  updateUser(@Req() req) {
    return this.usersService.update(req.user.id, req.body);
  }
}
