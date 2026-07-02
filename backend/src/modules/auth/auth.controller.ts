import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  async login(@Body() body: { email: string; password: string }) {
    return this.authService.validateUser(body.email, body.password)
      .then(user => {
        if (!user) {
          throw new Error('Invalid credentials');
        }
        return this.authService.login(user);
      });
  }

  @Post('register')
  @ApiOperation({ summary: 'User registration' })
  register(@Body() body: any) {
    return this.authService.register(body);
  }

  @Get('profile')
  @ApiOperation({ summary: 'Get user profile' })
  getProfile(@Request() req: any) {
    return req.user;
  }
}
