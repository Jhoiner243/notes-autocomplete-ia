import { Module } from '@nestjs/common';
import { CreateNotasUseCase } from './application/create-nota/create-nota.use-case';
import { INotasRepository } from './domain/repository/notas.repository';
import { CreateNotaController } from './infraestructure/http-api/create-nota/create-nota.controller';
import { NotasPersistence } from './infraestructure/http-api/persistence/notas.persistence';

@Module({
  controllers: [CreateNotaController],
  providers: [
    CreateNotasUseCase,
    NotasPersistence,
    {
      provide: INotasRepository,
      useExisting: NotasPersistence,
    },
  ],
  exports: [INotasRepository],
})
export class NotasModule {}
