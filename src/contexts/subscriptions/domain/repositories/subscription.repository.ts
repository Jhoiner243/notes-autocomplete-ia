import { SubscriptionEntity } from '../entities/subscription.entity';

export interface ISubscriptionRepository {
  findById(id: string): Promise<SubscriptionEntity | null>;
  findByStripeId(stripeId: string): Promise<SubscriptionEntity | null>;
  create(subscription: SubscriptionEntity): Promise<void>;
  update(subscription: SubscriptionEntity): Promise<void>;
  updateStatus(id: string, status: string): Promise<void>;
}
