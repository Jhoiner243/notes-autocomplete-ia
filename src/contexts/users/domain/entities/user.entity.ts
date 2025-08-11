import { UserRole } from '../value-objects/user.role.vo';

export class User {
  constructor(
    public name: string,
    public lastName: string,
    public email: string,
    public role: UserRole,
  ) {}
}
