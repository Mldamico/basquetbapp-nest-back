import { IsNotEmpty, IsNumber } from 'class-validator';

export class EndMatchDto {
  @IsNotEmpty()
  opponent: string;

  @IsNumber()
  @IsNotEmpty()
  score: number;

  @IsNumber()
  @IsNotEmpty()
  opponentScore: number;
}
