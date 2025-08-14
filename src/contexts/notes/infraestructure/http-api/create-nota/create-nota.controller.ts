import { Body, Controller, Post } from '@nestjs/common';
import { UserId } from '../../../../shared/decorators/user-id.decorator';
import { CreateNotaCommand } from '../../../application/commands/create-nota.command';
import { CreateNotasUseCase } from '../../../application/use-cases/create-nota/create-nota.use-case';
import { ROUTE_NOTAS } from '../route.constant';
import { CreateNotaDto } from './create-nota.dto';

@Controller(ROUTE_NOTAS)
export class CreateNotaController {
  constructor(private readonly createNotaUseCase: CreateNotasUseCase) {}

  @Post()
  async createNota(
    @Body() note: CreateNotaDto,
    @UserId() userId: string,
  ): Promise<void> {
    const cmd = new CreateNotaCommand(
      note.title,
      note.content,
      note.metadata,
      1,
    );

    await this.createNotaUseCase.execute(cmd, userId);
  }
}
