import { Controller, Get, Query } from '@nestjs/common';
import { FindNotasByTitleQuery } from '../../../application/commands/find-notas-by-title.query';
import { FindNotasByTitleUseCase } from '../../../application/use-cases/find-notas-by-title/find-notas-by-title.use-case';
import { ROUTE_NOTAS } from '../route.constant';

@Controller(ROUTE_NOTAS)
export class FindNotasByTitleController {
  constructor(private readonly useCase: FindNotasByTitleUseCase) {}

  @Get()
  async handle(@Query('title') title: string) {
    const list = await this.useCase.execute(new FindNotasByTitleQuery(title));
    return list.map((entity) => ({
      id: entity.id,
      title: entity.title.value,
      content: entity.content,
      isDelete: entity.isDelete,
      metadata: entity.metadata.getValuePrimitiveMetadata(),
      version: entity.version,
      createdAt: entity.createdAt,
    }));
  }
}
