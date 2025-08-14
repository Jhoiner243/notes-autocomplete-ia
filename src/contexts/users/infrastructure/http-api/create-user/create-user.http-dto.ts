import { IsEmail, IsEnum, IsString, Length } from 'class-validator';
import { UserRole as Roles } from '../../../domain/value-objects/user.role.vo';

export enum UserRole {
  ENFERMERA = 'ENFERMERA',
  DOCTOR = 'DOCTOR',
}

export class UserCreateDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(3, 20)
  name: string;

  @IsString()
  lastName: string;

  @IsEnum(UserRole, {
    message: 'El rol no es válido',
  })
  role!: Roles;
}
