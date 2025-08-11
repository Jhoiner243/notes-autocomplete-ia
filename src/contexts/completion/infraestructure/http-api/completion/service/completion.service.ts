/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { openai } from '@ai-sdk/openai';
import { Inject, Injectable } from '@nestjs/common';
import { streamText } from 'ai';
import { ICompletion } from '../../../../domain/interface/completion.interface';
import { CompletionRepositoryImple } from '../repositories/completion.repository';

@Injectable()
export class CompletionService implements ICompletion {
  constructor(
    @Inject(CompletionRepositoryImple)
    private completionRepository: CompletionRepositoryImple,
  ) {}

  async completionSdkAi({
    prompt,
    context,
    token_max,
  }: {
    token_max: number;
    prompt: string;
    context: string;
  }): Promise<{ completion: string }> {
    const system =
      'Eres un asistente que autocompleta notas médicas. Responde en el mismo idioma del usuario. Sé conciso y clínicamente útil.';

    const result = streamText({
      model: openai('gpt-4o-mini'),
      system,
      prompt: `${context}\n\nUsuario: ${prompt}\nAsistente:`,
      maxOutputTokens: token_max,
      temperature: 0.2,
    });

    const totalTokens = (await result.totalUsage).outputTokens ?? 0;
    const costEstimated = (totalTokens / 1_000_000) * 5;

    const userId = 'anonymous-user';
    await this.completionRepository.createUsageRecord({
      userId,
      endpoint: 'Autocomplete',
      tokensConsumed: totalTokens,
      costEstimated,
    });

    return { completion: await result.text };
  }
}
