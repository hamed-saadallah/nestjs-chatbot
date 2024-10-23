import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOneByUserName(username);
    if (user && user.password !== password) {
      throw new UnauthorizedException();
    }
    const payload = { userId: user.id, username: user.username };
    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
