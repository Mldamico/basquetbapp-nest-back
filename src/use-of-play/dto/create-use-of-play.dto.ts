import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateUseOfPlayDto {
  @IsNotEmpty()
  @IsNumber()
  quarter: number;
  @IsNotEmpty()
  scored: boolean;
  @IsNotEmpty()
  @IsNumber()
  value: number;
}
