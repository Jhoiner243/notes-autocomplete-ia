import { Module } from '@nestjs/common';
import Redis from 'ioredis';
import { CompletionUseCase } from './application/use-cases/autocomplete/completion.use-case';
import { CompletionController } from './infraestructure/http-api/completion/autocomplete.controller';

import { CompletionService } from './infraestructure/http-api/completion/service/autocomplete/completion.service';
import { ModelSelectFromCompletion } from './infraestructure/http-api/completion/service/model-select';
import {
  RedisQuotaService,
  RedisQuotaServiceToken,
} from './infraestructure/http-api/completion/service/quotas-autocomplete/redis-quota.service';
import {
  CompletionRepositoryImple,
  CompletionRepositoryImpleToken,
} from './infraestructure/persistence/completion.persistence';

@Module({
  controllers: [CompletionController],
  providers: [
    CompletionUseCase,
    CompletionService,
    CompletionRepositoryImple,
    RedisQuotaService,
    ModelSelectFromCompletion,
    {
      provide: CompletionRepositoryImpleToken,
      useExisting: CompletionRepositoryImple,
    },
    {
      provide: RedisQuotaServiceToken,
      useExisting: RedisQuotaService,
    },
    {
      provide: 'REDIS_CLIENT',
      useFactory: () => {
        return new Redis({
          host: process.env.REDIS_HOST || '127.0.0.1',
          port: parseInt(process.env.REDIS_PORT || '6379', 10),
          password: process.env.REDIS_PASSWORD || undefined,
          db: parseInt(process.env.REDIS_DB || '0', 10),
        });
      },
    },
  ],
  exports: [
    CompletionUseCase,
    CompletionRepositoryImpleToken,
    RedisQuotaServiceToken,
    ModelSelectFromCompletion,
  ],
})
export class CompletionModule {}
