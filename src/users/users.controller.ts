import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/updateUserDto';
import { CreateUserDto } from './dto/createUserDto';
import { UsersService } from './users.service';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Public()
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Post()
  create(@Body() CreateUserDto: CreateUserDto) {
    return this.userService.create(CreateUserDto);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Get(':id')
  findOneByUsername(@Param('username') username: string) {
    return this.userService.findOneByUserName(username);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() UpdateUserDto: UpdateUserDto) {
    return this.userService.update(id, UpdateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.userService.remove(id);
  }
}
