/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Inject } from '@nestjs/common';
import { Injectable as CustomInjectable } from '../../../../shared/dependency-injection/custom-injectable';
import { INotasRepository } from '../../../domain/repository/notas.repository';
import { NotasPersistenceToken } from '../../../infraestructure/persistence/notas.persistence';
import { NotesCacheService } from '../../../infraestructure/persistence/notes-cache.service';
import { GetNotaByIdQuery } from '../../commands/get-nota-by-id.query';

@CustomInjectable()
export class GetNotaByIdUseCase {
  constructor(
    @Inject(NotasPersistenceToken)
    private readonly notasRepository: INotasRepository,
    @Inject(NotesCacheService)
    private readonly notesCache: NotesCacheService,
  ) {}

  async execute(query: GetNotaByIdQuery) {
    // Buscar en caché
    const cached = await this.notesCache.getNote(query.id);
    if (cached) {
      return JSON.parse(cached);
    }
    // Buscar en repo y guardar en caché
    const nota = await this.notasRepository.findById(query.id);
    if (nota) {
      await this.notesCache.setNote(query.id, JSON.stringify(nota));
    }
    return nota;
  }
}
