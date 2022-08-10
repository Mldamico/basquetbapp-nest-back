import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { GetUser, Roles } from 'src/auth/decorator';
import { roles } from 'src/types';
import { JwtGuard, RolesGuard } from '../auth/guard';

@Controller('player')
export class PlayerController {
  @Get('/me')
  @Roles(roles.ASSISTANT, roles.TRAINER)
  @UseGuards(JwtGuard, RolesGuard)
  me(@GetUser() user) {
    return user;
  }
}
