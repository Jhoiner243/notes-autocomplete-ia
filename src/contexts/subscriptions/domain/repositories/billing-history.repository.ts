import { BillingHistoryEntity } from '../entities/billing-history.entity';

export interface IBillingHistoryRepository {
  create(history: BillingHistoryEntity): Promise<void>;
  findBySubscriptionId(subscriptionId: string): Promise<BillingHistoryEntity[]>;
  updateStatus(id: string, status: string): Promise<void>;
}
