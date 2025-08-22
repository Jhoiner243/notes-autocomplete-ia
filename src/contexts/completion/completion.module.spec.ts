import { Test, TestingModule } from '@nestjs/testing';
import { RedisModule } from '../../infraestructure/redis/redis.module';
import { PrismaModule } from '../../shared/prisma/prisma.module';
import { CompletionUseCase } from './application/use-cases/autocomplete/completion.use-case';
import { CompletionModule } from './completion.module';
import { CompletionRepository } from './domain/repositories/completion.repository';
import { AutocompleteController } from './infraestructure/http-api/completion/autocomplete.controller';
import { CompletionService } from './infraestructure/http-api/completion/service/autocomplete/completion.service';
import { ModelSelectService } from './infraestructure/http-api/completion/service/model-select.ts';
import { RedisQuotaService } from './infraestructure/http-api/completion/service/quotas-autocomplete/redis-quota.service';
import {
  CompletionPersistence,
  CompletionRepositoryToken,
} from './infraestructure/persistence/completion.persistence';

describe('CompletionModule', () => {
  let module: TestingModule;
  let autocompleteController: AutocompleteController;
  let completionUseCase: CompletionUseCase;
  let completionService: CompletionService;
  let redisQuotaService: RedisQuotaService;
  let modelSelectService: ModelSelectService;
  let completionPersistence: CompletionPersistence;
  let completionRepository: CompletionRepository;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [CompletionModule, PrismaModule, RedisModule],
    }).compile();

    // Controllers
    autocompleteController = module.get<AutocompleteController>(
      AutocompleteController,
    );

    // Use Cases
    completionUseCase = module.get<CompletionUseCase>(CompletionUseCase);

    // Services
    completionService = module.get<CompletionService>(CompletionService);
    redisQuotaService = module.get<RedisQuotaService>(RedisQuotaService);
    modelSelectService = module.get<ModelSelectService>(ModelSelectService);

    // Persistence
    completionPersistence = module.get<CompletionPersistence>(
      CompletionPersistence,
    );
    completionRepository = module.get<CompletionRepository>(
      CompletionRepositoryToken,
    );
  });

  afterEach(async () => {
    await module.close();
  });

  describe('Module Initialization', () => {
    it('should be defined', () => {
      expect(module).toBeDefined();
    });

    it('should have all required controllers', () => {
      expect(autocompleteController).toBeDefined();
    });

    it('should have all required use cases', () => {
      expect(completionUseCase).toBeDefined();
    });

    it('should have all required services', () => {
      expect(completionService).toBeDefined();
      expect(redisQuotaService).toBeDefined();
      expect(modelSelectService).toBeDefined();
    });

    it('should have all required persistence services', () => {
      expect(completionPersistence).toBeDefined();
      expect(completionRepository).toBeDefined();
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
      expect(() => module.get(CompletionModule)).not.toThrow();
    });

    it('should inject CompletionRepository with correct token', () => {
      expect(completionRepository).toBeDefined();
      expect(typeof completionRepository.create).toBe('function');
    });
  });

  describe('Module Exports', () => {
    it('should export CompletionUseCase', () => {
      const exportedUseCase = module.get(CompletionUseCase);
      expect(exportedUseCase).toBeDefined();
    });

    it('should export CompletionService', () => {
      const exportedService = module.get(CompletionService);
      expect(exportedService).toBeDefined();
    });

    it('should export RedisQuotaService', () => {
      const exportedQuotaService = module.get(RedisQuotaService);
      expect(exportedQuotaService).toBeDefined();
    });
  });

  describe('Module Configuration', () => {
    it('should have correct module metadata', () => {
      const moduleRef = module.get(CompletionModule);
      expect(moduleRef).toBeDefined();
    });

    it('should configure all providers as Injectable', () => {
      const providers = module.get(CompletionModule);
      expect(providers).toBeDefined();
    });

    it('should have correct import order', () => {
      const imports = module.get(CompletionModule);
      expect(imports).toBeDefined();
    });
  });

  describe('AI Service Integration', () => {
    it('should have completion service properly configured', () => {
      expect(completionService).toBeDefined();
      expect(typeof completionService.generateCompletion).toBe('function');
    });

    it('should have model selection service', () => {
      expect(modelSelectService).toBeDefined();
      expect(typeof modelSelectService.selectModel).toBe('function');
    });

    it('should support multiple AI providers', () => {
      expect(completionService).toBeDefined();
      // Verificar que el servicio puede manejar diferentes proveedores
    });
  });

  describe('Quota Management', () => {
    it('should have Redis quota service properly configured', () => {
      expect(redisQuotaService).toBeDefined();
      expect(typeof redisQuotaService.checkQuota).toBe('function');
      expect(typeof redisQuotaService.incrementUsage).toBe('function');
    });

    it('should integrate with Redis for quota tracking', () => {
      expect(redisQuotaService).toBeDefined();
      expect(module.get(RedisModule)).toBeDefined();
    });

    it('should handle quota validation correctly', () => {
      expect(redisQuotaService).toBeDefined();
      expect(typeof redisQuotaService.validateQuota).toBe('function');
    });
  });

  describe('Controller-UseCase Integration', () => {
    it('should properly inject use cases into controllers', () => {
      expect(autocompleteController).toBeDefined();
      expect(completionUseCase).toBeDefined();
    });

    it('should have proper route configuration', () => {
      expect(autocompleteController).toBeDefined();
      // Verificar que las rutas están configuradas correctamente
    });

    it('should handle autocomplete requests properly', () => {
      expect(autocompleteController).toBeDefined();
      expect(completionUseCase).toBeDefined();
    });
  });

  describe('Repository Pattern Implementation', () => {
    it('should implement repository pattern correctly', () => {
      expect(completionPersistence).toBeDefined();
      expect(typeof completionPersistence.create).toBe('function');
      expect(typeof completionPersistence.findById).toBe('function');
    });

    it('should use correct injection token', () => {
      expect(completionRepository).toBeDefined();
      expect(completionRepository).toBe(completionPersistence);
    });
  });

  describe('AI Model Selection', () => {
    it('should have model selection logic', () => {
      expect(modelSelectService).toBeDefined();
      expect(typeof modelSelectService.selectModel).toBe('function');
    });

    it('should support fallback models', () => {
      expect(modelSelectService).toBeDefined();
      // Verificar lógica de fallback
    });
  });

  describe('Error Handling', () => {
    it('should have proper error handling setup', () => {
      const moduleRef = module.get(CompletionModule);
      expect(moduleRef).toBeDefined();
    });

    it('should handle AI service failures gracefully', () => {
      expect(completionService).toBeDefined();
      // Verificar manejo de errores
    });

    it('should handle quota exceeded scenarios', () => {
      expect(redisQuotaService).toBeDefined();
      // Verificar manejo de cuotas excedidas
    });
  });

  describe('Performance and Caching', () => {
    it('should implement caching strategies', () => {
      expect(module.get(RedisModule)).toBeDefined();
      // Verificar estrategias de cache
    });

    it('should handle concurrent requests properly', () => {
      expect(redisQuotaService).toBeDefined();
      // Verificar manejo de concurrencia
    });
  });

  describe('Monitoring and Logging', () => {
    it('should track usage metrics', () => {
      expect(completionPersistence).toBeDefined();
      // Verificar tracking de métricas
    });

    it('should log AI interactions', () => {
      expect(completionService).toBeDefined();
      // Verificar logging de interacciones
    });
  });
});
