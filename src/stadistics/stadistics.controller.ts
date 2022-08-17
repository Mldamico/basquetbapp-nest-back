import { Controller, Get, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/decorator';
import { StadisticsService } from './stadistics.service';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { roles } from 'src/types';

@Controller('stadistics')
export class StadisticsController {
  constructor(private stadisticsService: StadisticsService) {}

  @Roles(roles.PLAYER, roles.ASSISTANT, roles.TRAINER)
  @UseGuards(JwtGuard)
  @Get('/most-used-plays')
  mostUsedPlays() {
    return this.stadisticsService.mostUsedPlays();
  }

  @Roles(roles.PLAYER, roles.ASSISTANT, roles.TRAINER)
  @UseGuards(JwtGuard)
  @Get('/most-scored-plays')
  mostScoredPlays() {
    return this.stadisticsService.mostScoredPlays();
  }

  @Roles(roles.PLAYER, roles.ASSISTANT, roles.TRAINER)
  @UseGuards(JwtGuard)
  @Get('/less-scored-plays')
  lessScoredPlays() {
    return this.stadisticsService.lessScoredPlays();
  }
}
