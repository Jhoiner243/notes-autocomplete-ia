import { INotasRepository } from '../../../domain/repository/notas.repository';
import { GetNotaByIdQuery } from '../../commands/get-nota-by-id.query';

export class GetNotaByIdUseCase {
  constructor(private readonly notasRepository: INotasRepository) {}

  async execute(query: GetNotaByIdQuery) {
    return this.notasRepository.findById(query.id);
  }
}
