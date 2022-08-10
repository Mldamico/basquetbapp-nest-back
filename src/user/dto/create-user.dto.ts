import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUser {
  @IsNotEmpty()
  @IsEmail()
  email: String;

  @IsNotEmpty()
  password: String;
}
