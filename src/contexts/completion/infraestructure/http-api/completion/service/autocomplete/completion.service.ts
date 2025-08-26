import { Inject } from '@nestjs/common';
import { type LanguageModel, streamText, StreamTextResult } from 'ai';
import { Injectable as CustomInjectable } from '../../../../../../shared/dependency-injection/custom-injectable';
import { IQuotaService } from '../../../../../domain/entities/control-cuota.interface';
import { ModelSelectFromCompletion } from '../model-select';
import { RedisQuotaServiceToken } from '../quotas-autocomplete/redis-quota.service';

@CustomInjectable()
export class CompletionService {
  constructor(
    @Inject(ModelSelectFromCompletion)
    private modelSelectFromCompletion: ModelSelectFromCompletion,
    @Inject(RedisQuotaServiceToken)
    private quotaService: IQuotaService,
  ) {}

  async completionSdkAi({
    model,
    userId,
    prompt,
    context,
  }: {
    userId: string;
    prompt: string;
    context: string;
    model?: string;
  }): Promise<StreamTextResult<any, any>> {
    // Control de cuota
    const canUse = await this.quotaService.canUse(userId);
    if (!canUse) {
      throw new Error('Límite de cuota alcanzado.');
    }

    const modelSelect: LanguageModel =
      this.modelSelectFromCompletion.SelectModelFromCompletion(
        model ? model : 'gpt-4o-mini',
      );

    const result = streamText({
      model: modelSelect,
      prompt: `${context}\n\nUsuario: ${prompt}\nAsistente:`,
      maxOutputTokens: 20,
      temperature: 0.75,
    });

    return result;
  }
}
