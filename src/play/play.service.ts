import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePlayDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { UpdatePlayDto } from './dto/update-play.dto';

@Injectable()
export class PlayService {
  constructor(private prismaService: PrismaService) {}

  async createPlay(dto: CreatePlayDto) {
    try {
      const play = await this.prismaService.play.create({
        data: {
          name: dto.name,
          point: dto.point,
          shooterPosition: dto.shooterPosition,
          assistPosition: dto.assistPosition,
          instruction: dto.instruction,
        },
      });
      return play;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('La jugada ya existe.');
        }
      }
    }
  }

  getPlays() {
    return this.prismaService.play.findMany({
      where: {
        active: true,
      },
    });
  }

  getPlay(id: number) {
    return this.prismaService.play.findFirstOrThrow({
      where: {
        id,
        active: true,
      },
    });
  }

  updatePlay(id: number, dto: UpdatePlayDto) {
    return this.prismaService.play.update({
      where: { id },
      data: {
        name: dto.name,
        point: dto.point,
        shooterPosition: dto.shooterPosition,
        assistPosition: dto.assistPosition,
        instruction: dto.instruction,
      },
    });
  }

  deactivatePlay(id: number) {
    return this.prismaService.play.update({
      where: {
        id: id,
      },
      data: {
        active: false,
      },
    });
  }
}
