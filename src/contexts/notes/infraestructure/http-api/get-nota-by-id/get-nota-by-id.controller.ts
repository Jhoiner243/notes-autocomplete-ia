import { Controller, Get, Param } from '@nestjs/common';
import { GetNotaByIdQuery } from '../../../application/commands/get-nota-by-id.query';
import { GetNotaByIdUseCase } from '../../../application/use-cases/get-nota-by-id/get-nota-by-id.use-case';

@Controller('notes')
export class GetNotaByIdController {
  constructor(private readonly useCase: GetNotaByIdUseCase) {}

  @Get(':id')
  async handle(@Param('id') id: string) {
    const entity = await this.useCase.execute(new GetNotaByIdQuery(id));
    if (!entity) return null;
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
