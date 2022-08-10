import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { GetUser, Roles } from 'src/auth/decorator';
import { roles } from '../types/roles';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { RolesGuard } from 'src/auth/guard';

@Controller('user')
export class UserController {
  @Get('/me')
  @Roles(roles.TRAINER)
  @UseGuards(JwtGuard, RolesGuard)
  me(@GetUser() user) {
    return user;
  }
}
