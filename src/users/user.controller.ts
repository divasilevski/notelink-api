import { Controller, Get, Param } from '@nestjs/common';
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
}
