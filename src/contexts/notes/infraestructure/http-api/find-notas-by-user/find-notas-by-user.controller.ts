import { Controller, Get, Param } from '@nestjs/common';
import { FindNotasByUserQuery } from '../../../application/commands/find-notas-by-user.query';
import { FindNotasByUserUseCase } from '../../../application/use-cases/find-notas-by-user/find-notas-by-user.use-case';

@Controller('users/:userId/notes')
export class FindNotasByUserController {
  constructor(private readonly useCase: FindNotasByUserUseCase) {}

  @Get()
  async handle(@Param('userId') userId: string) {
    const list = await this.useCase.execute(new FindNotasByUserQuery(userId));
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
