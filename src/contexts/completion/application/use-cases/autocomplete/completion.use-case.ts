import { Inject } from '@nestjs/common';
import { Injectable as CustomInjectable } from '../../../../shared/dependency-injection/custom-injectable';
import { CompletionService } from '../../../infraestructure/http-api/completion/service/autocomplete/completion.service';
import { CompletionCommand } from '../../commands/completion.command';

@CustomInjectable()
export class CompletionUseCase {
  constructor(
    @Inject(CompletionService) private completionService: CompletionService,
  ) {}
  async completion({
    userId,
    prompt,
    context,
  }: CompletionCommand & { userId: string }): Promise<{ completion: string }> {
    const result = await this.completionService.completionSdkAi({
      userId,
      prompt,
      context,
    });

    return result;
  }
}
