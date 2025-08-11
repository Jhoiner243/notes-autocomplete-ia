import { Injectable } from '../../../../shared/dependency-injection/custom-injectable';
import { UserRepository } from '../../../domain/repositories/user.repository';
import { UpdateUserDto } from './update-user-use-case.dto';

@Injectable()
export class UpdateUserUseCase {
  constructor(private readonly _userRepository: UserRepository) {}

  async execute(_user: UpdateUserDto): Promise<void> {
    return;
  }
}
