import { Inject } from '@nestjs/common';
import { LanguageModel, streamText } from 'ai';
import { Injectable as CustomInjectable } from '../../../../../shared/dependency-injection/custom-injectable';
import { ICompletion } from '../../../../domain/repositories/completion.repository';
import { CompletionRepositoryImpleToken } from '../repositories/completion.repository';
import { ModelSelectFromCompletion } from './model-select';

@CustomInjectable()
export class CompletionService {
  constructor(
    @Inject(CompletionRepositoryImpleToken)
    private completionRepository: ICompletion,
    @Inject(ModelSelectFromCompletion)
    private modelSelectFromCompletion: ModelSelectFromCompletion,
  ) {}

  async completionSdkAi({
    prompt,
    context,
  }: {
    prompt: string;
    context: string;
  }): Promise<{ completion: string }> {
    const system =
      'Eres un asistente que autocompleta notas médicas. Responde en el mismo idioma del usuario. Sé conciso y clínicamente útil.';

    const model: LanguageModel =
      this.modelSelectFromCompletion.SelectModelFromCompletion('gpt-4o-mini');

    const result = streamText({
      model: model,
      system,
      prompt: `${context}\n\nUsuario: ${prompt}\nAsistente:`,
      maxOutputTokens: 50,
      temperature: 0.2,
    });

    const completionText = await result.text;

    return { completion: completionText };
  }
}
