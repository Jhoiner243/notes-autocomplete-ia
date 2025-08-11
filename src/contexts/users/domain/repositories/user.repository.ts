import { User } from '../entities/user.entity';
import { Email } from '../value-objects/email.vo';

export abstract class UserRepository {
  abstract create(userCreate: User): Promise<void>;
  abstract updated(user: User): Promise<void>;
  abstract findByEmail(email: Email): Promise<User | null>;
  abstract findAll(): Promise<User[] | null>;
}
