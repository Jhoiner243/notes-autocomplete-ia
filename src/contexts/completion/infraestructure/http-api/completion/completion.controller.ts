import { Body, Controller, Param, Post } from '@nestjs/common';
import { Injectable as CustomInjectable } from '../../../../shared/dependency-injection/custom-injectable';
import { CompletionDto } from '../../../application/use-cases/completion/completion.dto';
import { CompletionUseCase } from '../../../application/use-cases/completion/completion.use-case';
import { V1_COMPLETION } from './route.constants';

@CustomInjectable()
@Controller(V1_COMPLETION)
export class CompletionController {
  constructor(private completionUseCase: CompletionUseCase) {}

  @Post('/notes/:id/autocomplete')
  async completionNote(
    @Param('id') id: string,
    @Body() body: CompletionDto,
  ): Promise<{ completion: string }> {
    const { prompt, context, token_max } = body;
    return this.completionUseCase.completion({ prompt, context, token_max });
  }
}
