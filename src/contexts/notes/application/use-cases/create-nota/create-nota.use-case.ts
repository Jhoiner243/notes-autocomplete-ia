import { Inject } from '@nestjs/common';
import { Injectable as CustomInjectable } from '../../../../shared/dependency-injection/custom-injectable';
import { NotasEntity } from '../../../domain/entities/create-notas.entity';
import { INotasRepository } from '../../../domain/repository/notas.repository';
import { MetadataValueObjects } from '../../../domain/value-objects/metadata-json.value-object';
import { TitleNoteValueObject } from '../../../domain/value-objects/title-note.value-object';
import { NotasPersistenceToken } from '../../../infraestructure/persistence/notas.persistence';
import { CreateNotaCommand } from '../../commands/create-nota.command';

@CustomInjectable()
export class CreateNotasUseCase {
  constructor(
    @Inject(NotasPersistenceToken) private notasRepository: INotasRepository,
  ) {}

  async execute(note: CreateNotaCommand, userId: string): Promise<NotasEntity> {
    const titleVO = TitleNoteValueObject.create(note.title);
    const metadataVO = MetadataValueObjects.create(note.metadata);

    const entity = NotasEntity.create({
      title: titleVO,
      content: note.content,
      metadata: metadataVO,
    });

    return this.notasRepository.createNota(entity, userId);
  }
}
