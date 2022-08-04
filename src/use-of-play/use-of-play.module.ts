import { Module } from '@nestjs/common';
import { UseOfPlayController } from './use-of-play.controller';
import { UseOfPlayService } from './use-of-play.service';

@Module({
  imports: [],
  controllers: [UseOfPlayController],
  providers: [UseOfPlayService],
})
export class UseOfPlayModule {}
