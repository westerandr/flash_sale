import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Role } from '../../auth/role.enum';

export class CreateUserDto {
  @IsString()
  readonly firstName: string;
  @IsString()
  readonly lastName: string;
  @IsEmail()
  readonly email: string;
  readonly role: Role = Role.User;
  @IsNotEmpty()
  readonly password: string;
}
