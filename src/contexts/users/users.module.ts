import { Module } from '@nestjs/common';
import { CreateUserUseCase } from './application/use-cases/create-user-use-case/create-user.use-case';
import { UserRepository } from './domain/repositories/user.repository';
import { CreateUserController } from './infrastructure/http-api/create-user/create-user.controller';
import { UserCreateRepository } from './infrastructure/http-api/create-user/repositories/create-user.repository';

@Module({
  controllers: [CreateUserController],
  providers: [
    CreateUserUseCase,
    UserCreateRepository,
    {
      provide: UserRepository,
      useExisting: UserCreateRepository,
    },
  ],
  exports: [CreateUserUseCase, UserCreateRepository],
})
export class UserModule {}
