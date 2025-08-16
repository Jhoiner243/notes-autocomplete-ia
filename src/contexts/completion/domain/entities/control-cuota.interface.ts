export interface IQuotaService {
  canUse(userId: string): Promise<boolean>;
  recordUsage(userId: string, tokens: number): Promise<void>;
}
