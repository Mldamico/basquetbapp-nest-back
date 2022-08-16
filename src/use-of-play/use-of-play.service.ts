import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUseOfPlayDto } from './dto/create-use-of-play.dto';

@Injectable()
export class UseOfPlayService {
  constructor(private prismaService: PrismaService) {}

  createUseOfPlay(dto: CreateUseOfPlayDto) {
    return this.prismaService.useOfPlay.create({
      data: {
        scored: dto.scored,
        quarter: dto.quarter,
        value: dto.value,
        playId: dto.playId,
        scorerId: dto.scorerId,
        assisterId: dto.assisterId,
        matchId: dto.matchId,
      },
    });
  }
}
