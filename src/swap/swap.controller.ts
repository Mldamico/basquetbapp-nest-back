import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Roles } from '../auth/decorator';
import { CreateSwapDto } from './dto';
import { SwapService } from './swap.service';
import { roles } from '../types';
import { JwtGuard, RolesGuard } from '../auth/guard';

@Controller('swap')
export class SwapController {
  constructor(private swapService: SwapService) {}

  @Roles(roles.ASSISTANT)
  @UseGuards(JwtGuard, RolesGuard)
  @Post('')
  swap(@Body() dto: CreateSwapDto) {
    return this.swapService.swap(dto);
  }
}
