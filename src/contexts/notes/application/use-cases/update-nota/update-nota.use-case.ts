import { NotasEntity } from '../../../domain/entities/create-notas.entity';
import { INotasRepository } from '../../../domain/repository/notas.repository';
import { MetadataValueObjects } from '../../../domain/value-objects/metadata-json.value-object';
import { TitleNoteValueObject } from '../../../domain/value-objects/title-note.value-object';
import { UpdateNotaCommand } from '../../commands/update-nota.command';

export class UpdateNotaUseCase {
  constructor(private readonly notasRepository: INotasRepository) {}

  async execute(cmd: UpdateNotaCommand): Promise<void> {
    const existing = await this.notasRepository.findById(cmd.id);
    if (!existing) return;

    const updated = NotasEntity.update(existing, {
      title: cmd.title ? TitleNoteValueObject.create(cmd.title) : undefined,
      content: cmd.content,
      metadata: cmd.metadata
        ? MetadataValueObjects.create(cmd.metadata)
        : undefined,
    });

    await this.notasRepository.updateNote(updated);
  }
}
