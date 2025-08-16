import { Body, Controller, Inject, Param, Post } from '@nestjs/common';
import { Injectable as CustomInjectable } from '../../../../shared/dependency-injection/custom-injectable';
import { CompletionUseCase } from '../../../application/use-cases/autocomplete/completion.use-case';
import { AutoCompletionDto } from './autocomplete.dto';
import { V1_COMPLETION } from './route.constants';

@CustomInjectable()
@Controller(V1_COMPLETION)
export class CompletionController {
  constructor(
    @Inject(CompletionUseCase) private completionUseCase: CompletionUseCase,
  ) {}

  @Post('/notes/:id/autocomplete')
  async completionNote(
    @Param('id') id: string,
    @Body() body: AutoCompletionDto,
  ): Promise<{ completion: string }> {
    const { prompt, context } = body;
    return this.completionUseCase.completion({ userId: id, prompt, context });
  }
}
