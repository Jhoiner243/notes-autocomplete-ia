import { UserRole } from '../../../domain/value-objects/user.role.vo';

export interface UserCreateUseCaseDto {
  name: string;
  lastName: string;
  email: string;
  role: UserRole;
}
