import { Module } from '@nestjs/common';
import { SubscriptionModule } from './infraestructure/subscription.module';

@Module({
  imports: [SubscriptionModule],
  exports: [SubscriptionModule],
})
export class SubscriptionsModule {}
