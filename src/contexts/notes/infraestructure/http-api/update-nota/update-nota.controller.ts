import { Body, Controller, Param, Patch } from '@nestjs/common';
import { UpdateNotaCommand } from '../../../application/commands/update-nota.command';
import { UpdateNotaUseCase } from '../../../application/use-cases/update-nota/update-nota.use-case';
import { ROUTE_NOTAS } from '../route.constant';

class UpdateNotaDto {
  title?: string;
  content?: string;
  metadata?: object;
}

@Controller(ROUTE_NOTAS)
export class UpdateNotaController {
  constructor(private readonly useCase: UpdateNotaUseCase) {}

  @Patch(':id')
  async handle(
    @Param('id') id: string,
    @Body() body: UpdateNotaDto,
  ): Promise<void> {
    const cmd = new UpdateNotaCommand(
      id,
      body.title,
      body.content,
      body.metadata,
    );
    await this.useCase.execute(cmd);
  }
}
