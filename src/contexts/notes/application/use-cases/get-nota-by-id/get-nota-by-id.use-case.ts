import { Inject } from '@nestjs/common';
import { Injectable as CustomInjectable } from '../../../../shared/dependency-injection/custom-injectable';
import { INotasRepository } from '../../../domain/repository/notas.repository';
import { NotasPersistenceToken } from '../../../infraestructure/persistence/notas.persistence';
import { GetNotaByIdQuery } from '../../commands/get-nota-by-id.query';

@CustomInjectable()
export class GetNotaByIdUseCase {
  constructor(
    @Inject(NotasPersistenceToken)
    private readonly notasRepository: INotasRepository,
  ) {}

  async execute(query: GetNotaByIdQuery) {
    return this.notasRepository.findById(query.id);
  }
}
