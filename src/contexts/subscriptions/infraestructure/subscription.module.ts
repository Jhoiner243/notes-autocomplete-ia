import { Module } from '@nestjs/common';
import { PrismaModule } from '../../shared/prisma/prisma.module';
import { CreateSubscriptionUseCase } from '../application/use-cases/create-subscription.use-case';
import { GetPlansUseCase } from '../application/use-cases/get-plans.use-case';
import { HandleStripeWebhookUseCase } from '../application/use-cases/handle-stripe-webhook.use-case';
import { SubscriptionController } from './http-api/subscription.controller';
import {
  BillingHistoryPrismaRepository,
  BillingHistoryRepositoryToken,
} from './persistence/billing-history.prisma.repository';
import {
  SubscriptionPrismaRepository,
  SubscriptionsRepositoryToken,
} from './persistence/subscription.prisma.repository';

@Module({
  imports: [PrismaModule],
  controllers: [SubscriptionController],
  providers: [
    CreateSubscriptionUseCase,
    GetPlansUseCase,
    HandleStripeWebhookUseCase,
    SubscriptionPrismaRepository,
    BillingHistoryPrismaRepository,
    {
      provide: SubscriptionsRepositoryToken,
      useClass: SubscriptionPrismaRepository,
    },
    {
      provide: BillingHistoryRepositoryToken,
      useClass: BillingHistoryPrismaRepository,
    },
  ],
  exports: [
    CreateSubscriptionUseCase,
    GetPlansUseCase,
    HandleStripeWebhookUseCase,
  ],
})
export class SubscriptionModule {}
