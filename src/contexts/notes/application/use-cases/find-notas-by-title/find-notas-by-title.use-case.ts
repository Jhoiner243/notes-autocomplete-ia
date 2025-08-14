import { INotasRepository } from '../../../domain/repository/notas.repository';
import { FindNotasByTitleQuery } from '../../commands/find-notas-by-title.query';

export class FindNotasByTitleUseCase {
  constructor(private readonly notasRepository: INotasRepository) {}

  async execute(query: FindNotasByTitleQuery) {
    return this.notasRepository.findTitleNotes(query.title);
  }
}
