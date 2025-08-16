/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
jest.mock('ai', () => ({
  streamText: jest.fn(),
}));
import { streamText } from 'ai';
import { IQuotaService } from '../../../../../domain/entities/control-cuota.interface';
import { ModelSelectFromCompletion } from '../model-select';
import { CompletionService } from './completion.service';

describe('CompletionService', () => {
  let quotaService: jest.Mocked<IQuotaService>;
  let modelSelect: jest.Mocked<ModelSelectFromCompletion>;
  let service: CompletionService;

  beforeEach(() => {
    quotaService = {
      canUse: jest.fn(),
      recordUsage: jest.fn(),
    } as any;
    modelSelect = {
      SelectModelFromCompletion: jest.fn().mockReturnValue({}),
    } as any;
    service = new CompletionService(modelSelect, quotaService);
    jest.clearAllMocks();
  });

  it('should throw if quota not available', async () => {
    quotaService.canUse.mockResolvedValue(false);
    await expect(
      service.completionSdkAi({ userId: 'u1', prompt: 'p', context: 'c' }),
    ).rejects.toThrow('Límite de cuota alcanzado.');
  });

  it('should return completion and record usage if quota available', async () => {
    quotaService.canUse.mockResolvedValue(true);
    quotaService.recordUsage.mockResolvedValue();
    // Mock streamText
    const completionText = 'respuesta';
    (streamText as jest.Mock).mockReturnValue({
      text: Promise.resolve(completionText),
    });

    const result = await service.completionSdkAi({
      userId: 'u1',
      prompt: 'p',
      context: 'c',
    });
    expect(result.completion).toBe(completionText);
    expect(quotaService.recordUsage).toHaveBeenCalledWith(
      'u1',
      completionText.length,
    );
  });
});
