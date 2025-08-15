import { Module } from '@nestjs/common';
import { CompletionUseCase } from './application/use-cases/completion/completion.use-case';
import { CompletionController } from './infraestructure/http-api/completion/completion.controller';
import {
  CompletionRepositoryImple,
  CompletionRepositoryImpleToken,
} from './infraestructure/http-api/completion/repositories/completion.repository';
import { CompletionService } from './infraestructure/http-api/completion/service/completion.service';

@Module({
  controllers: [CompletionController],
  providers: [
    CompletionUseCase,
    CompletionService,
    CompletionRepositoryImple,
    {
      provide: CompletionRepositoryImpleToken,
      useExisting: CompletionRepositoryImple,
    },
  ],
  exports: [CompletionUseCase, CompletionRepositoryImpleToken],
})
export class CompletionModule {}
