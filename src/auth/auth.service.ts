import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as argon from 'argon2';
import { SignInDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

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
      const player = await this.prismaService.player.create({
        data: {
          email: dto.email,
          fullName: dto.fullName,
          password: hash,
        },
      });
      return this.signToken(player.id, player.email);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('el usuario ya existe.');
        }
      }
    }
  }

  async signin(dto: SignInDto) {
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

    return this.signToken(player.id, player.email);
  }

  signToken(userId: number, email: string) {
    const payload = {
      sub: userId,
      email,
    };

    const secret = this.config.get('JWT_SECRET');

    return {
      access_token: this.jwt.signAsync(payload, {
        expiresIn: '60m',
        secret,
      }),
    };
  }
}
