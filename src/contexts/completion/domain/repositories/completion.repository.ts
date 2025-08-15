export abstract class ICompletion {
  abstract completionSdkAiTokesConsumed({
    userId,
  }: {
    userId: string;
  }): Promise<{ remainingTokens: number }>;
  abstract createUsageRecord({
    userId,
    tokensConsumed,
    costEstimated,
    endpoint,
  }: {
    userId: string;
    tokensConsumed: number;
    costEstimated: number;
    endpoint: 'AUTOCOMPLETE';
  }): Promise<void>;
}
