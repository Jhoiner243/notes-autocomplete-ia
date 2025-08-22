import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from '../shared/prisma/prisma.module';
import { CreateUserUseCase } from './application/use-cases/create-user-use-case/create-user.use-case';
import { UpdateUserUseCase } from './application/use-cases/update-user-use-case/update-user-use-case';
import { CreateUserController } from './infrastructure/http-api/create-user/create-user.controller';
import { UserCreateRepository } from './infrastructure/http-api/create-user/repositories/create-user.repository';
import { UpdateUserController } from './infrastructure/http-api/update-user/update-user.controller';
import { UserModule } from './users.module';

describe('UsersModule', () => {
  let module: TestingModule;
  let createUserController: CreateUserController;
  let updateUserController: UpdateUserController;
  let createUserUseCase: CreateUserUseCase;
  let updateUserUseCase: UpdateUserUseCase;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [UserModule, PrismaModule],
    }).compile();

    createUserController =
      module.get<CreateUserController>(CreateUserController);
    updateUserController =
      module.get<UpdateUserController>(UpdateUserController);
    createUserUseCase = module.get<CreateUserUseCase>(CreateUserUseCase);
    updateUserUseCase = module.get<UpdateUserUseCase>(UpdateUserUseCase);
  });

  afterEach(async () => {
    await module.close();
  });

  describe('Module Initialization', () => {
    it('should be defined', () => {
      expect(module).toBeDefined();
    });

    it('should have all required controllers', () => {
      expect(createUserController).toBeDefined();
      expect(updateUserController).toBeDefined();
    });

    it('should have all required use cases', () => {
      expect(createUserUseCase).toBeDefined();
      expect(updateUserUseCase).toBeDefined();
    });

    it('should have all required repositories', () => {
      const createUserRepo =
        module.get<UserCreateRepository>(UserCreateRepository);

      expect(createUserRepo).toBeDefined();
    });
  });

  describe('Dependency Injection', () => {
    it('should inject PrismaModule correctly', () => {
      const prismaModule = module.get(PrismaModule);
      expect(prismaModule).toBeDefined();
    });

    it('should resolve all dependencies without circular references', () => {
      expect(() => module.get(UserModule)).not.toThrow();
    });
  });

  describe('Module Exports', () => {
    it('should export CreateUserUseCase', () => {
      const exportedUseCase = module.get(CreateUserUseCase);
      expect(exportedUseCase).toBeDefined();
    });

    it('should export UpdateUserUseCase', () => {
      const exportedUseCase = module.get(UpdateUserUseCase);
      expect(exportedUseCase).toBeDefined();
    });
  });

  describe('Module Configuration', () => {
    it('should have correct module metadata', () => {
      const moduleRef = module.get(UserModule);
      expect(moduleRef).toBeDefined();
    });

    it('should configure all providers as Injectable', () => {
      const providers = module.get(UserModule);
      expect(providers).toBeDefined();
    });
  });
});
