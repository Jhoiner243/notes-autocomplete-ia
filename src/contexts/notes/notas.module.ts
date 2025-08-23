import { Module } from '@nestjs/common';
import { PrismaService } from '../../infraestructure/prisma/prisma.service';
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
import {
  NotasPersistence,
  NotasPersistenceToken,
} from './infraestructure/persistence/notas.persistence';
import { NotesCacheService } from './infraestructure/persistence/notes-cache.service';

@Module({
  controllers: [
    CreateNotaController,
    GetNotaByIdController,
    UpdateNotaController,
    DeleteNotaController,
    FindNotasByTitleController,
    FindNotasByUserController,
  ],
  providers: [
    PrismaService,
    CreateNotasUseCase,
    GetNotaByIdUseCase,
    UpdateNotaUseCase,
    DeleteNotaUseCase,
    FindNotasByTitleUseCase,
    FindNotasByUserUseCase,
    NotasPersistence,
    {
      provide: NotasPersistenceToken,
      useExisting: NotasPersistence,
    },

    NotesCacheService,
  ],
  exports: [NotasPersistenceToken, NotesCacheService],
})
export class NotasModule {}
