import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
} from 'class-validator';
import { Position } from './types';

export class CreatePlayDto {
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
