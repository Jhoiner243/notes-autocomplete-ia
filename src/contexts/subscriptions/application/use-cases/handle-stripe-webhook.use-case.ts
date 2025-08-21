/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Inject } from '@nestjs/common';
import Stripe from 'stripe';
import { StatusSubscription } from '../../../../../generated/prisma';
import { IBillingHistoryRepository } from '../../domain/repositories/billing-history.repository';
import { ISubscriptionRepository } from '../../domain/repositories/subscription.repository';

export class HandleStripeWebhookUseCase {
  constructor(
    @Inject('ISubscriptionRepository')
    private readonly subscriptionRepo: ISubscriptionRepository,
    @Inject('IBillingHistoryRepository')
    private readonly billingRepo: IBillingHistoryRepository,
  ) {}

  async execute(event: Stripe.Event): Promise<void> {
    if (event.type === 'climate.order.canceled') {
      await this.subscriptionRepo.updateStatus(
        event.id as string,
        StatusSubscription.CANCELED,
      );
    }

    if (event.type === 'invoice.paid') {
      await this.subscriptionRepo.updateStatus(
        event.id as string,
        StatusSubscription.ACTIVE,
      );
    }
  }
}
