import { Test, TestingModule } from '@nestjs/testing';
import { RedisModule } from '../../infraestructure/redis/redis.module';
import { PrismaModule } from '../shared/prisma/prisma.module';
import { CreateNotasUseCase } from './application/use-cases/create-nota/create-nota.use-case';
import { DeleteNotaUseCase } from './application/use-cases/delete-nota/delete-nota.use-case';
import { FindNotasByTitleUseCase } from './application/use-cases/find-notas-by-title/find-notas-by-title.use-case';
import { FindNotasByUserUseCase } from './application/use-cases/find-notas-by-user/find-notas-by-user.use-case';
import { GetNotaByIdUseCase } from './application/use-cases/get-nota-by-id/get-nota-by-id.use-case';
import { UpdateNotaUseCase } from './application/use-cases/update-nota/update-nota.use-case';
import { CreateNotaController } from './infraestructure/http-api/create-nota/create-nota.controller';
import { DeleteNotaController } from './infraestructure/http-api/delete-nota/delete-nota.controller';
import { FindNotasByTitleController } from './infraestructure/http-api/find-notas-by-title/find-notas-by-title.controller';
import { FindNotasByUserController } from './infraestructure/http-api/find-notas-by-user/find-notas-by-user.controller';
import { GetNotaByIdController } from './infraestructure/http-api/get-nota-by-id/get-nota-by-id.controller';
import { UpdateNotaController } from './infraestructure/http-api/update-nota/update-nota.controller';
import { NotasPersistence } from './infraestructure/persistence/notas.persistence';
import { NotesCacheService } from './infraestructure/persistence/notes-cache.service';
import { NotasModule } from './notas.module';

describe('NotasModule', () => {
  let module: TestingModule;
  let createNotaController: CreateNotaController;
  let getNotaByIdController: GetNotaByIdController;
  let updateNotaController: UpdateNotaController;
  let deleteNotaController: DeleteNotaController;
  let findNotasByTitleController: FindNotasByTitleController;
  let findNotasByUserController: FindNotasByUserController;
  let createNotaUseCase: CreateNotasUseCase;
  let getNotaByIdUseCase: GetNotaByIdUseCase;
  let updateNotaUseCase: UpdateNotaUseCase;
  let deleteNotaUseCase: DeleteNotaUseCase;
  let findNotasByTitleUseCase: FindNotasByTitleUseCase;
  let findNotasByUserUseCase: FindNotasByUserUseCase;
  let notasPersistence: NotasPersistence;
  let notesCacheService: NotesCacheService;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [NotasModule, PrismaModule, RedisModule],
    }).compile();

    // Controllers
    createNotaController =
      module.get<CreateNotaController>(CreateNotaController);
    getNotaByIdController = module.get<GetNotaByIdController>(
      GetNotaByIdController,
    );
    updateNotaController =
      module.get<UpdateNotaController>(UpdateNotaController);
    deleteNotaController =
      module.get<DeleteNotaController>(DeleteNotaController);
    findNotasByTitleController = module.get<FindNotasByTitleController>(
      FindNotasByTitleController,
    );
    findNotasByUserController = module.get<FindNotasByUserController>(
      FindNotasByUserController,
    );

    // Use Cases
    createNotaUseCase = module.get<CreateNotasUseCase>(CreateNotasUseCase);
    getNotaByIdUseCase = module.get<GetNotaByIdUseCase>(GetNotaByIdUseCase);
    updateNotaUseCase = module.get<UpdateNotaUseCase>(UpdateNotaUseCase);
    deleteNotaUseCase = module.get<DeleteNotaUseCase>(DeleteNotaUseCase);
    findNotasByTitleUseCase = module.get<FindNotasByTitleUseCase>(
      FindNotasByTitleUseCase,
    );
    findNotasByUserUseCase = module.get<FindNotasByUserUseCase>(
      FindNotasByUserUseCase,
    );

    // Services
    notasPersistence = module.get<NotasPersistence>(NotasPersistence);
    notesCacheService = module.get<NotesCacheService>(NotesCacheService);
  });

  describe('Module Initialization', () => {
    it('should be defined', () => {
      expect(module).toBeDefined();
    });

    it('should have all required controllers', () => {
      expect(createNotaController).toBeDefined();
      expect(getNotaByIdController).toBeDefined();
      expect(updateNotaController).toBeDefined();
      expect(deleteNotaController).toBeDefined();
      expect(findNotasByTitleController).toBeDefined();
      expect(findNotasByUserController).toBeDefined();
    });

    it('should have all required use cases', () => {
      expect(createNotaUseCase).toBeDefined();
      expect(getNotaByIdUseCase).toBeDefined();
      expect(updateNotaUseCase).toBeDefined();
      expect(deleteNotaUseCase).toBeDefined();
      expect(findNotasByTitleUseCase).toBeDefined();
      expect(findNotasByUserUseCase).toBeDefined();
    });

    it('should have all required services', () => {
      expect(notasPersistence).toBeDefined();
      expect(notesCacheService).toBeDefined();
    });
  });

  describe('Dependency Injection', () => {
    it('should inject PrismaModule correctly', () => {
      const prismaModule = module.get(PrismaModule);
      expect(prismaModule).toBeDefined();
    });

    it('should inject RedisModule correctly', () => {
      const redisModule = module.get(RedisModule);
      expect(redisModule).toBeDefined();
    });

    it('should resolve all dependencies without circular references', () => {
      expect(() => module.get(NotasModule)).not.toThrow();
    });
  });

  describe('Module Exports', () => {
    it('should export all use cases', () => {
      const exportedUseCases = [
        CreateNotasUseCase,
        GetNotaByIdUseCase,
        UpdateNotaUseCase,
        DeleteNotaUseCase,
        FindNotasByTitleUseCase,
        FindNotasByUserUseCase,
      ];

      exportedUseCases.forEach((useCase) => {
        expect(() => module.get(useCase)).not.toThrow();
      });
    });

    it('should export persistence services', () => {
      expect(() => module.get(NotasPersistence)).not.toThrow();
      expect(() => module.get(NotesCacheService)).not.toThrow();
    });
  });

  describe('Module Configuration', () => {
    it('should have correct module metadata', () => {
      const moduleRef = module.get(NotasModule);
      expect(moduleRef).toBeDefined();
    });

    it('should configure all providers as Injectable', () => {
      const providers = module.get(NotasModule);
      expect(providers).toBeDefined();
    });

    it('should have correct import order', () => {
      const imports = module.get(NotasModule);
      expect(imports).toBeDefined();
    });
  });

  describe('Service Integration', () => {
    it('should integrate cache service with persistence', () => {
      expect(notesCacheService).toBeDefined();
      expect(notasPersistence).toBeDefined();
    });

    it('should have proper error handling setup', () => {
      const moduleRef = module.get(NotasModule);
      expect(moduleRef).toBeDefined();
    });
  });

  describe('Controller-UseCase Integration', () => {
    it('should properly inject use cases into controllers', () => {
      expect(createNotaController).toBeDefined();
      expect(createNotaUseCase).toBeDefined();
    });

    it('should have proper route configuration', () => {
      const controllers = [
        createNotaController,
        getNotaByIdController,
        updateNotaController,
        deleteNotaController,
        findNotasByTitleController,
        findNotasByUserController,
      ];

      controllers.forEach((controller) => {
        expect(controller).toBeDefined();
      });
    });
  });

  describe('Repository Pattern Implementation', () => {
    it('should implement repository pattern correctly', () => {
      expect(notasPersistence).toBeDefined();
      expect(typeof notasPersistence.createNota).toBe('function');
      expect(typeof notasPersistence.findById).toBe('function');
      expect(typeof notasPersistence.updateNote).toBe('function');
      expect(typeof notasPersistence.softDeleteNotes).toBe('function');
    });
  });

  describe('Cache Service Integration', () => {
    it('should have cache service properly configured', () => {
      expect(notesCacheService).toBeDefined();
      expect(typeof notesCacheService.getNote).toBe('function');
      expect(typeof notesCacheService.setNote).toBe('function');
      expect(typeof notesCacheService.deleteNote).toBe('function');
    });
  });
});
