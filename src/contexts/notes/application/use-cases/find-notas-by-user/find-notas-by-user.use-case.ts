import { INotasRepository } from '../../../domain/repository/notas.repository';
import { FindNotasByUserQuery } from '../../commands/find-notas-by-user.query';

export class FindNotasByUserUseCase {
  constructor(private readonly notasRepository: INotasRepository) {}

  async execute(query: FindNotasByUserQuery) {
    return this.notasRepository.findAllByUser(query.userId);
  }
}
