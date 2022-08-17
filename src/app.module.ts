import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { PlayModule } from './play/play.module';
import { UserModule } from './user/user.module';
import { UseOfPlayModule } from './use-of-play/use-of-play.module';
import { MatchModule } from './match/match.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PlayerController } from './player/player.controller';
import { PlayerModule } from './player/player.module';
import { SwapModule } from './swap/swap.module';
import { StadisticsModule } from './stadistics/stadistics.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PlayModule,
    UserModule,
    UseOfPlayModule,
    MatchModule,
    PrismaModule,
    AuthModule,
    PlayerModule,
    SwapModule,
    StadisticsModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
