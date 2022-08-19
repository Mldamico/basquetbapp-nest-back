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

  @Roles(roles.PLAYER, roles.ASSISTANT, roles.TRAINER)
  @UseGuards(JwtGuard)
  @Get('/most-scored-player')
  mostScoredPlayer() {
    return this.stadisticsService.mostScoredPlayer();
  }

  @Roles(roles.PLAYER, roles.ASSISTANT, roles.TRAINER)
  @UseGuards(JwtGuard)
  @Get('/most-failed-player')
  mostFailedPlayer() {
    return this.stadisticsService.mostFailedPlayer();
  }

  @Roles(roles.PLAYER, roles.ASSISTANT, roles.TRAINER)
  @UseGuards(JwtGuard)
  @Get('/most-assister-player')
  mostAssisterPlayer() {
    return this.stadisticsService.mostAssisterPlayer();
  }

  @Roles(roles.PLAYER, roles.ASSISTANT, roles.TRAINER)
  @UseGuards(JwtGuard)
  @Get('/most-effective-against')
  mostEffectiveAgainstOpponent() {
    return this.stadisticsService.mostEffectiveAgainstOpponent();
  }

  @Roles(roles.PLAYER, roles.ASSISTANT, roles.TRAINER)
  @UseGuards(JwtGuard)
  @Get('/less-effective-assister')
  lessEffectiveAssister() {
    return this.stadisticsService.lessEffectiveAssister();
  }

  @Roles(roles.PLAYER, roles.ASSISTANT, roles.TRAINER)
  @UseGuards(JwtGuard)
  @Get('/most-quintet-plays')
  mostQuintetPlays() {
    return this.stadisticsService.mostQuintetPlays();
  }

  @Roles(roles.PLAYER, roles.ASSISTANT, roles.TRAINER)
  @UseGuards(JwtGuard)
  @Get('/most-quintet-points')
  mostQuintetPoints() {
    return this.stadisticsService.mostQuintetPoints();
  }

  @Roles(roles.PLAYER, roles.ASSISTANT, roles.TRAINER)
  @UseGuards(JwtGuard)
  @Get('/most-quintet-assists')
  mostAssistQuintets() {
    return this.stadisticsService.mostAssistQuintets();
  }

  @Roles(roles.PLAYER, roles.ASSISTANT, roles.TRAINER)
  @UseGuards(JwtGuard)
  @Get('/most-quintet-miss')
  mostFailedQuintets() {
    return this.stadisticsService.mostFailedQuintets();
  }

  @Roles(roles.PLAYER, roles.ASSISTANT, roles.TRAINER)
  @UseGuards(JwtGuard)
  @Get('/most-quintet-effective')
  mostEffectiveQuintets() {
    return this.stadisticsService.mostEffectiveQuintets();
  }
}
