/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { CompletionService } from '../../../infraestructure/http-api/completion/service/autocomplete/completion.service';
import { CompletionUseCase } from './completion.use-case';

describe('CompletionUseCase', () => {
  let completionService: jest.Mocked<CompletionService>;
  let useCase: CompletionUseCase;

  beforeEach(() => {
    completionService = {
      completionSdkAi: jest.fn(),
    } as any;
    useCase = new CompletionUseCase(completionService);
  });

  it('should call completionService and return result', async () => {
    const expected = { completion: 'ok' };
    completionService.completionSdkAi.mockResolvedValue(expected);
    const result = await useCase.completion({
      userId: 'u',
      prompt: 'p',
      context: 'c',
    });
    expect(result).toEqual(expected);
    expect(completionService.completionSdkAi).toHaveBeenCalledWith({
      userId: 'u',
      prompt: 'p',
      context: 'c',
    });
  });
});
