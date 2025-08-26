/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Body, Controller, Inject, Post, Query, Sse } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Injectable as CustomInjectable } from '../../../../shared/dependency-injection/custom-injectable';
import { CompletionUseCase } from '../../../application/use-cases/autocomplete/completion.use-case';
import { IQuotaService } from '../../../domain/entities/control-cuota.interface';
import { AutoCompletionDto } from './autocomplete.dto';
import { V1_COMPLETION } from './route.constants';
import { RedisQuotaServiceToken } from './service/quotas-autocomplete/redis-quota.service';

@CustomInjectable()
@Controller(V1_COMPLETION)
export class CompletionController {
  constructor(
    @Inject(CompletionUseCase) private completionUseCase: CompletionUseCase,
    @Inject(RedisQuotaServiceToken)
    private quotaService: IQuotaService,
  ) {}

  @Post('/notes/:id/autocomplete')
  @Sse()
  async completionNote(
    @Query('model') model: string,
    @Body() body: AutoCompletionDto,
  ): Promise<Observable<MessageEvent<any>>> {
    const { prompt, context } = body;
    let fullText = '';

    const result = await this.completionUseCase.completion({
      userId: '1',
      prompt,
      context,
      model,
    });

    return new Observable((subscriber) => {
      async function processStream() {
        try {
          // 2. Itera sobre el stream de texto (string)
          for await (const chunk of result.textStream) {
            fullText += chunk;
            console.log('chunk', chunk);
            subscriber.next(new MessageEvent('data', { data: chunk }));
          }

          await this.quotaService.recordUsage('1', fullText.length);

          subscriber.complete();
        } catch (error) {
          subscriber.error(error);
        }
      }
      processStream.call(this);
    });
  }
}
