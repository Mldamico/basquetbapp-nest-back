import { IsEmail, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class SignUpDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  fullName: string;

  @IsOptional()
  shirtNumber?: number;

  @IsOptional()
  urlPhoto?: string;
}
