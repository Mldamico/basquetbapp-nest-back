import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { PlayModule } from './play/play.module';
import { UserModule } from './user/user.module';
import { UseOfPlayModule } from './use-of-play/use-of-play.module';
import { MatchModule } from './match/match.module';

@Module({
  imports: [PlayModule, UserModule, UseOfPlayModule, MatchModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
