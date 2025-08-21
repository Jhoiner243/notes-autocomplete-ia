import { Module } from '@nestjs/common';
import { CreateSubscriptionUseCase } from '../../application/use-cases/create-subscription.use-case';
import { HandleStripeWebhookUseCase } from '../../application/use-cases/handle-stripe-webhook.use-case';
import { BillingHistoryPrismaRepository } from '../persistence/billing-history.prisma.repository';
import { SubscriptionPrismaRepository } from '../persistence/subscription.prisma.repository';
import { StripeService } from '../stripe.service';
import { SubscriptionController } from './subscription.controller';

@Module({
  controllers: [SubscriptionController],
  providers: [
    CreateSubscriptionUseCase,
    HandleStripeWebhookUseCase,
    StripeService,
    {
      provide: 'ISubscriptionRepository',
      useClass: SubscriptionPrismaRepository,
    },
    {
      provide: 'IBillingHistoryRepository',
      useClass: BillingHistoryPrismaRepository,
    },
  ],
  exports: [CreateSubscriptionUseCase, HandleStripeWebhookUseCase],
})
export class SubscriptionModule {}
