import { NotasEntity } from '../../../domain/entities/create-notas.entity';

// DTO que define la forma de la respuesta JSON
export class GetNotaByIdResponseDto {
  id: string;
  title: string;
  content: string;
  isDelete: boolean;
  metadata: Record<string, any>;
  version: number;
  createdAt: Date;
}

// Mapper que convierte la entidad de dominio al DTO de respuesta
export class NotaToResponseDtoMapper {
  static map(entity: NotasEntity): GetNotaByIdResponseDto {
    return {
      id: entity.id,
      title: entity.title.value,
      content: entity.content,
      isDelete: entity.isDelete,
      metadata: entity.metadata.getValuePrimitiveMetadata(),
      version: entity.version,
      createdAt: entity.createdAt,
    };
  }
}
