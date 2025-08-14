import { Nota as PrismaNota } from '../../../../../generated/prisma';
import { NotasEntity } from '../../domain/entities/create-notas.entity';
import { MetadataValueObjects } from '../../domain/value-objects/metadata-json.value-object';
import { TitleNoteValueObject } from '../../domain/value-objects/title-note.value-object';

export class NotaMapper {
  // Convierte de la persistencia (Prisma) al dominio (Entity)
  public static toDomain(prismaNota: PrismaNota): NotasEntity {
    const title = TitleNoteValueObject.create(prismaNota.title);

    const metadata = MetadataValueObjects.create(prismaNota.metadata);

    return new NotasEntity(
      prismaNota.id,
      title,
      prismaNota.content,
      prismaNota.isDelete,
      metadata,
      prismaNota.version,
      prismaNota.createdAt,
    );
  }
}
