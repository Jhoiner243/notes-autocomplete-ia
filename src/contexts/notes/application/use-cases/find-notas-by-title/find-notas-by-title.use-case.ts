import { Inject } from '@nestjs/common';
import { Injectable as CustomInjectable } from '../../../../shared/dependency-injection/custom-injectable';
import { INotasRepository } from '../../../domain/repository/notas.repository';
import { NotasPersistenceToken } from '../../../infraestructure/persistence/notas.persistence';
import { FindNotasByTitleQuery } from '../../commands/find-notas-by-title.query';

@CustomInjectable()
export class FindNotasByTitleUseCase {
  constructor(
    @Inject(NotasPersistenceToken)
    private readonly notasRepository: INotasRepository,
  ) {}

  async execute(query: FindNotasByTitleQuery) {
    return this.notasRepository.findTitleNotes(query.title);
  }
}
