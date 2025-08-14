import { Body, Controller, Post } from '@nestjs/common';
import { CreateNotaCommand } from '../../../application/commands/create-nota.command';
import { CreateNotasUseCase } from '../../../application/use-cases/create-nota/create-nota.use-case';
import { CreateNotaDto } from './create-nota.dto';

@Controller('notes')
export class CreateNotaController {
  constructor(private readonly createNotaUseCase: CreateNotasUseCase) {}

  @Post()
  async createNota(@Body() note: CreateNotaDto): Promise<void> {
    const cmd = new CreateNotaCommand(
      note.title,
      note.content,
      note.metadata,
      note.version,
    );
    await this.createNotaUseCase.execute(cmd);
  }
}
