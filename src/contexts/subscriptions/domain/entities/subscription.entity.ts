import { StatusSubscription } from '../../../../../generated/prisma';

export class SubscriptionEntity {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly stripeSubscriptionId: string,
    public readonly planId: string,
    public status: StatusSubscription,
    public currentPeriodEnd: Date,
  ) {}

  updateStatus(newStatus: StatusSubscription) {
    this.status = newStatus;
  }

  updatePeriodEnd(newDate: Date) {
    this.currentPeriodEnd = newDate;
  }
}
