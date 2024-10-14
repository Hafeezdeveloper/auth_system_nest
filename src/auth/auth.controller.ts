// auth.controller.ts
import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login')
  async login(@Body() body: any) {
    const user = await this.authService.validateUser(body.userName, body.password);
    console.log(user)
    if (!user) {
      return { error: 'Invalid credentials' };
    }
    return this.authService.login(user);
  }

  @Post('protected')
  @UseGuards(JwtAuthGuard)
  getProtectedData(@Request() req) {
    console.log("req", req.users, req.token)
    return { data: 'Protected Data', user: req.users };
  }
}
