import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';
import { roles } from '../../types/roles';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService, private prismaService: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  async validate(payload) {
    if (payload.type === roles.PLAYER) {
      const player = await this.prismaService.player.findUnique({
        where: {
          id: payload.sub,
        },
      });
      delete player.password;
      return player;
    } else {
      const user = await this.prismaService.user.findUnique({
        where: {
          id: payload.sub,
        },
      });
      delete user.password;
      return user;
    }
  }
}
