// user/user.controller.ts
import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    getProfile(@Request() req) {
        return req.user; // The user object will be available after the token is decoded
    }


}
