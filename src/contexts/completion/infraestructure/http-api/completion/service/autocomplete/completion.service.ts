import { Inject } from '@nestjs/common';
import { LanguageModel, streamText } from 'ai';
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
    model: string;
  }): Promise<{ completion: string }> {
    // Control de cuota
    const canUse = await this.quotaService.canUse(userId);
    if (!canUse) {
      throw new Error('Límite de cuota alcanzado.');
    }

    const system =
      'Eres un asistente que autocompleta notas médicas. Responde en el mismo idioma del usuario. Sé conciso y clínicamente útil.';

    const modelSelect: LanguageModel =
      this.modelSelectFromCompletion.SelectModelFromCompletion(model);

    const result = streamText({
      model: modelSelect,
      system,
      prompt: `${context}\n\nUsuario: ${prompt}\nAsistente:`,
      maxOutputTokens: 50,
      temperature: 0.2,
    });

    const completionText = await result.text;

    const tokensUsed = completionText.length;
    await this.quotaService.recordUsage(userId, tokensUsed);

    return { completion: completionText };
  }
}
