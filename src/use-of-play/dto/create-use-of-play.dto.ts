import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateUseOfPlayDto {
  @IsNotEmpty()
  @IsNumber()
  quarter: number;
  @IsNotEmpty()
  scored: boolean;
  @IsNotEmpty()
  @IsNumber()
  value: number;

  @IsNotEmpty()
  playId: number;

  @IsNotEmpty()
  scorerId: number;

  @IsOptional()
  assisterId: number;

  @IsOptional()
  matchId: number;
}
