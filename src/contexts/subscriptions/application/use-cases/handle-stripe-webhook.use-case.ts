import { Inject, Injectable, RawBodyRequest } from '@nestjs/common';
import { Request } from 'express';
import { StatusSubscription } from '../../../../../generated/prisma';
import { envs } from '../../../../common/config/config';
import { IBillingHistoryRepository } from '../../domain/repositories/billing-history.repository';
import { ISubscriptionRepository } from '../../domain/repositories/subscription.repository';
import { BillingHistoryRepositoryToken } from '../../infraestructure/persistence/billing-history.prisma.repository';
import { SubscriptionsRepositoryToken } from '../../infraestructure/persistence/subscription.prisma.repository';
import { StripeService } from '../../infraestructure/stripe.service';

@Injectable()
export class HandleStripeWebhookUseCase {
  constructor(
    @Inject(StripeService) private stripeService: StripeService,
    @Inject(SubscriptionsRepositoryToken)
    private readonly subscriptionRepo: ISubscriptionRepository,
    @Inject(BillingHistoryRepositoryToken)
    private readonly billingRepo: IBillingHistoryRepository,
  ) {}

  async execute(req: RawBodyRequest<Request>) {
    const signature = req.headers['stripe-signature'] as string;
    if (envs.endpointStripeWebhook && req.rawBody) {
      const event = this.stripeService.constructorEvent(req.rawBody, signature);
      console.log('event', event);
      if (event.type === 'invoice.payment_failed') {
        const invoice = event.data.object;
        await this.subscriptionRepo.updateStatus(
          (invoice.id as string) ?? '',
          StatusSubscription.CANCELED,
        );
      }

      if (event.type === 'payment_intent.succeeded') {
        await this.subscriptionRepo.updateStatus(
          event.id,
          StatusSubscription.ACTIVE,
        );
      }
    }
  }
}
