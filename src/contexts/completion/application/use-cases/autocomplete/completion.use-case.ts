import { Inject } from '@nestjs/common';
import { StreamTextResult } from 'ai';
import { Injectable as CustomInjectable } from '../../../../shared/dependency-injection/custom-injectable';
import { CompletionService } from '../../../infraestructure/http-api/completion/service/autocomplete/completion.service';
import { CompletionCommand } from '../../commands/completion.command';

@CustomInjectable()
export class CompletionUseCase {
  constructor(
    @Inject(CompletionService) private completionService: CompletionService,
  ) {}
  async completion({
    model,
    userId,
    prompt,
    context,
  }: CompletionCommand & { userId: string }): Promise<
    StreamTextResult<any, any>
  > {
    const result = await this.completionService.completionSdkAi({
      model,
      userId,
      prompt,
      context,
    });

    return result;
  }
}
