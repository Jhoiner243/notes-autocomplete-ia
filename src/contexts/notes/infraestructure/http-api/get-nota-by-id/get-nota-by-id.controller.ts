import {
  Controller,
  Get,
  Inject,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { GetNotaByIdQuery } from '../../../application/commands/get-nota-by-id.query';
import { GetNotaByIdUseCase } from '../../../application/use-cases/get-nota-by-id/get-nota-by-id.use-case';
import { ROUTE_NOTAS } from '../route.constant';
import {
  GetNotaByIdResponseDto,
  NotaToResponseDtoMapper,
} from './get-nota-by-id.response.dto';

@Controller(ROUTE_NOTAS)
export class GetNotaByIdController {
  constructor(
    @Inject(GetNotaByIdUseCase) private readonly useCase: GetNotaByIdUseCase,
  ) {}

  @Get(':id')
  async handle(@Param('id') id: string): Promise<GetNotaByIdResponseDto> {
    const entity = await this.useCase.execute(new GetNotaByIdQuery(id));

    if (!entity) {
      throw new NotFoundException(
        `La nota con el id "${id}" no fue encontrada.`,
      );
    }

    return NotaToResponseDtoMapper.map(entity);
  }
}
