import { IsNotEmpty, IsNumber } from 'class-validator';

export class EndMatchDto {
  @IsNumber()
  @IsNotEmpty()
  score: number;

  @IsNumber()
  @IsNotEmpty()
  opponentScore: number;
}
