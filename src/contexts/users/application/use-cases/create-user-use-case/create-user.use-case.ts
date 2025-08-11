import { Injectable } from '../../../../shared/dependency-injection/custom-injectable';
import { UserCreateRepository } from '../../../infrastructure/http-api/create-user/repositories/create-user.repository';
import { type UserCreateUseCaseDto } from './create-user-use-case.dto';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userRepository: UserCreateRepository) {}

  async execute(user: UserCreateUseCaseDto): Promise<void> {
    return await this.userRepository.createUser(user);
  }
}
