import { IsArray, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Position } from './types';

export class UpdatePlayDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  shooterPosition: Position;
  @IsOptional()
  assistPosition?: Position;
  @IsNumber()
  @IsOptional()
  point: number;

  @IsArray()
  instruction: {}[];
}
