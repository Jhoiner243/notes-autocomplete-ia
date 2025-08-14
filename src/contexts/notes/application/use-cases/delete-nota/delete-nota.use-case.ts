import { INotasRepository } from '../../../domain/repository/notas.repository';
import { DeleteNotaCommand } from '../../commands/delete-nota.command';

export class DeleteNotaUseCase {
  constructor(private readonly notasRepository: INotasRepository) {}

  async execute(cmd: DeleteNotaCommand): Promise<{ message: string }> {
    if (cmd.hard) {
      return this.notasRepository.hardDeleteNotes(cmd.id);
    }
    return this.notasRepository.softDeleteNotes(cmd.id);
  }
}
