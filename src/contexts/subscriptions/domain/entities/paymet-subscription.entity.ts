import { StatusSubscription } from '../../../../../generated/prisma';

export class PaymentSubscriptionEntity {
  public status: StatusSubscription;

  constructor(
    readonly userId: string,
    readonly StripeSubscriptionId: string,
    status: StatusSubscription,
    readonly currentPeriodEnd: Date,
  ) {
    this.status = status;
  }

  updateStatus(newStatus: StatusSubscription): void {
    this.status = newStatus;
  }
}
