import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: SignInDto, @Res() res: Response) {
    const user = await this.authService.signIn(
      signInDto.username,
      signInDto.password,
    );
    // const access_token = user;
    // console.log(user);
    res.cookie('access_token', user.access_token, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
    return user;
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
