import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { MatchService } from './match.service';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { RolesGuard } from '../auth/guard/role.guard';
import { Roles } from 'src/auth/decorator';
import { roles } from '../types/roles';
import { CreateMatchDto } from './dto/create-match.dto';
import { EndMatchDto } from './dto/end-match.dto';

@Controller('match')
export class MatchController {
  constructor(private matchService: MatchService) {}

  @Roles(roles.ASSISTANT)
  @UseGuards(JwtGuard, RolesGuard)
  @Post('/create')
  createMatch(@Body() dto: CreateMatchDto) {
    return this.matchService.createMatch(dto);
  }

  @Roles(roles.ASSISTANT)
  @UseGuards(JwtGuard, RolesGuard)
  @Put('/end/:id')
  endMatch(@Param('id') id: string, @Body() dto: EndMatchDto) {
    return this.matchService.endMatch(+id, dto);
  }

  @Roles(roles.ASSISTANT)
  @UseGuards(JwtGuard, RolesGuard)
  @Get('/:id')
  getMatch(@Param('id') id: string) {
    return this.matchService.getMatch(+id);
  }
}
