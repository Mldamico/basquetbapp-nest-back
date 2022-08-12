import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UseOfPlayService } from './use-of-play.service';
import { CreateUseOfPlayDto } from './dto/create-use-of-play.dto';
import { Roles } from 'src/auth/decorator';
import { roles } from '../types/roles';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { RolesGuard } from '../auth/guard/role.guard';

@Controller('use')
export class UseOfPlayController {
  constructor(private useOfPlayService: UseOfPlayService) {}

  @Roles(roles.ASSISTANT)
  @UseGuards(JwtGuard, RolesGuard)
  @Post('/create')
  createUseOfPlay(@Body() dto: CreateUseOfPlayDto) {
    return this.useOfPlayService.createUseOfPlay(dto);
  }
}
