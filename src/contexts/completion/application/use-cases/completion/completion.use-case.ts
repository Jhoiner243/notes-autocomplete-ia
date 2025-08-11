import { Inject } from '@nestjs/common';
import { Injectable as CustomInjectable } from '../../../../shared/dependency-injection/custom-injectable';
import { CompletionService } from '../../../infraestructure/http-api/completion/service/completion.service';
import { CompletionDto } from './completion.dto';

@CustomInjectable()
export class CompletionUseCase {
  constructor(
    @Inject(CompletionService) private completionService: CompletionService,
  ) {}
  async completion({
    prompt,
    context,
    token_max,
  }: CompletionDto): Promise<{ completion: string }> {
    if (!prompt) {
      throw new Error('El prompt es obligatorio');
    }

    const result = await this.completionService.completionSdkAi({
      prompt,
      context,
      token_max,
    });

    return result;
  }
}
