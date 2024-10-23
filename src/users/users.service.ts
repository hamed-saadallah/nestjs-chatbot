import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUserDto';
import { UpdateUserDto } from './dto/updateUserDto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  findAll() {
    return this.usersRepository.find();
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOne({ where: { id: +id } });
    if (!user) {
      throw new NotFoundException(`User with id: ${id} not found.`);
    }

    return user;
  }

  async findOneByUserName(username: string) {
    const user = await this.usersRepository.findOne({ where: { username } });
    if (!user) {
      throw new NotFoundException(`User with username: ${username} not found.`);
    }

    return user;
  }

  create(userDto: CreateUserDto) {
    const user = this.usersRepository.create(userDto);
    return this.usersRepository.save(user);
  }

  async update(id: number, userDto: UpdateUserDto) {
    const user = await this.usersRepository.preload({
      id: +id,
      ...userDto,
    });
    if (!user) {
      throw new NotFoundException(`User with id: ${id} not found.`);
    }
    return this.usersRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    return this.usersRepository.remove(user);
  }
}
