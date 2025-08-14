import { NotasEntity } from '../../../domain/entities/create-notas.entity';
import { INotasRepository } from '../../../domain/repository/notas.repository';
import { MetadataValueObjects } from '../../../domain/value-objects/metadata-json.value-object';
import { TitleNoteValueObject } from '../../../domain/value-objects/title-note.value-object';
import { CreateNotaCommand } from '../../commands/create-nota.command';

export class CreateNotasUseCase {
  constructor(private readonly notasRepository: INotasRepository) {}

  async execute(note: CreateNotaCommand): Promise<void> {
    const titleVO = TitleNoteValueObject.create(note.title);
    const metadataVO = MetadataValueObjects.create(note.metadata);

    const entity = NotasEntity.create({
      title: titleVO,
      content: note.content,
      metadata: metadataVO,
    });

    await this.notasRepository.createNota(entity);
  }
}
