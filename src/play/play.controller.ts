import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorator';
import { JwtGuard, RolesGuard } from '../auth/guard';
import { roles } from 'src/types';
import { CreatePlayDto } from './dto/create-play.dto';
import { PlayService } from './play.service';
import { UpdatePlayDto } from './dto/update-play.dto';

@Controller('play')
export class PlayController {
  constructor(private playService: PlayService) {}

  @Post('/create')
  @Roles(roles.TRAINER)
  @UseGuards(JwtGuard, RolesGuard)
  createPlay(@Body() dto: CreatePlayDto) {
    return this.playService.createPlay(dto);
  }

  @Get()
  @UseGuards(JwtGuard)
  getPlays() {
    return this.playService.getPlays();
  }

  @Get('/:id')
  @UseGuards(JwtGuard)
  getPlay(@Param('id') id: string) {
    return this.playService.getPlay(+id);
  }

  @Roles(roles.TRAINER)
  @UseGuards(JwtGuard, RolesGuard)
  @Put('/update/:id')
  updatePlay(@Param('id') id: string, @Body() dto: UpdatePlayDto) {
    return this.playService.updatePlay(+id, dto);
  }

  @Put('/deactivate/:id')
  @Roles(roles.TRAINER)
  @UseGuards(JwtGuard, RolesGuard)
  deactivatePlay(@Param('id') id: string) {
    return this.playService.deactivatePlay(+id);
  }
}
