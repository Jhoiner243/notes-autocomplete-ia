import { Body, Controller, Post } from '@nestjs/common';
import { CreateNotasUseCase } from '../../../application/create-nota/create-nota.use-case';
import { CreateNotaDto } from './create-nota.dto';

@Controller('notes')
export class CreateNotaController {
  constructor(private readonly createNotaUseCase: CreateNotasUseCase) {}

  @Post('/nota-create')
  async createNota(@Body() note: CreateNotaDto): Promise<void> {
    await this.createNotaUseCase.execute(note);
  }
}
