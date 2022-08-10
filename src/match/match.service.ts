import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { EndMatchDto } from './dto/end-match.dto';

@Injectable()
export class MatchService {
  constructor(private prismaService: PrismaService) {}

  createMatch(dto: CreateMatchDto) {
    return this.prismaService.match.create({
      data: {
        opponent: dto.opponent,
      },
    });
  }

  endMatch(id: number, dto: EndMatchDto) {
    return this.prismaService.match.update({
      where: {
        id,
      },
      data: {
        score: dto.score,
        opponentScore: dto.score,
      },
    });
  }
}
