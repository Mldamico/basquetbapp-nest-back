import { Module } from '@nestjs/common';
import { StadisticsController } from './stadistics.controller';
import { StadisticsService } from './stadistics.service';

@Module({
  controllers: [StadisticsController],
  providers: [StadisticsService],
})
export class StadisticsModule {}
