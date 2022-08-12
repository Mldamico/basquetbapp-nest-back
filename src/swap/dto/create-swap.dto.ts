import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Position } from 'src/play/dto/types';

export class CreateSwapDto {
  @IsNotEmpty()
  @IsString()
  position: Position;
  @IsNotEmpty()
  @IsNumber()
  quarter: number;
  @IsNotEmpty()
  @IsNumber()
  time: number;
  @IsNotEmpty()
  @IsNumber()
  timePlaying: number;
  @IsNotEmpty()
  @IsNumber()
  enteringPlayerId: number;
  @IsNotEmpty()
  @IsNumber()
  leavingPlayerId: number;
  @IsNotEmpty()
  @IsNumber()
  matchId: number;
}
