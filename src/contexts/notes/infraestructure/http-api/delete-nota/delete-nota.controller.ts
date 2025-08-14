import { Controller, Delete, Param, Query } from '@nestjs/common';
import { DeleteNotaCommand } from '../../../application/commands/delete-nota.command';
import { DeleteNotaUseCase } from '../../../application/use-cases/delete-nota/delete-nota.use-case';
import { ROUTE_NOTAS } from '../route.constant';

@Controller(ROUTE_NOTAS)
export class DeleteNotaController {
  constructor(private readonly useCase: DeleteNotaUseCase) {}

  @Delete(':id')
  async handle(@Param('id') id: string, @Query('hard') hard?: string) {
    const isHard = hard === 'true' || hard === '1';
    return this.useCase.execute(new DeleteNotaCommand(id, isHard));
  }
}
