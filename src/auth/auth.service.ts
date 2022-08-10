import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as argon from 'argon2';
import { SignInDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { roles } from '../types/roles';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: SignUpDto) {
    const hash = await argon.hash(dto.password);

    try {
      if (dto.type === roles.TRAINER || dto.type === roles.ASSISTANT) {
        const user = await this.prismaService.user.create({
          data: {
            email: dto.email,
            password: hash,
            type: dto.type,
          },
        });
        return this.signToken(user.id, user.email, user.type);
      } else {
        const player = await this.prismaService.player.create({
          data: {
            email: dto.email,
            fullName: dto.fullName,
            password: hash,
          },
        });
        return this.signToken(player.id, player.email, player.type);
      }
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('el usuario ya existe.');
        }
      }
    }
  }

  async signin(dto: SignInDto) {
    if (dto.type === roles.TRAINER || dto.type === roles.ASSISTANT) {
      const user = await this.prismaService.user.findUnique({
        where: {
          email: dto.email,
        },
      });
      if (!user) {
        throw new ForbiddenException('Error con email o contraseña');
      }
      console.log(dto.password);
      console.log(user.password);
      const match = await argon.verify(user.password, dto.password);
      if (!match) {
        throw new ForbiddenException('Error con email o contraseña');
      }

      return this.signToken(user.id, user.email, user.type);
    } else {
      const player = await this.prismaService.player.findUnique({
        where: {
          email: dto.email,
        },
      });
      if (!player) {
        throw new ForbiddenException('Error con email o contraseña');
      }
      const match = await argon.verify(player.password, dto.password);
      if (!match) {
        throw new ForbiddenException('Error con email o contraseña');
      }

      return this.signToken(player.id, player.email, player.type);
    }
  }

  async signToken(userId: number, email: string, type) {
    const payload = {
      sub: userId,
      email,
      type,
    };

    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '60m',
      secret,
    });
    return {
      access_token: token,
    };
  }
}
