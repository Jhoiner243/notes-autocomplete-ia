import { Inject } from '@nestjs/common';
import { Injectable as CustomInjectable } from '../../../../shared/dependency-injection/custom-injectable';
import { CompletionService } from '../../../infraestructure/http-api/completion/service/completion.service';
import { CompletionCommand } from './commands/completion.command';

@CustomInjectable()
export class CompletionUseCase {
  constructor(
    @Inject(CompletionService) private completionService: CompletionService,
  ) {}
  async completion({
    prompt,
    context,
  }: CompletionCommand): Promise<{ completion: string }> {
    const result = await this.completionService.completionSdkAi({
      prompt,
      context,
    });

    return result;
  }
}
