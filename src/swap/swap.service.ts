import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSwapDto } from './dto';

@Injectable()
export class SwapService {
  constructor(private prismaService: PrismaService) {}

  swap(dto: CreateSwapDto) {
    return this.prismaService.swap.create({
      data: {
        position: dto.position,
        quarter: dto.quarter,
        time: dto.time,
        timePlaying: dto.timePlaying,
        enteringPlayerId: dto.enteringPlayerId,
        leavingPlayerId: dto.enteringPlayerId,
        matchId: dto.matchId,
      },
    });
  }
}
