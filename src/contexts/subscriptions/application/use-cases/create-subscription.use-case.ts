/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Inject } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { StatusSubscription } from '../../../../../generated/prisma';
import { SubscriptionEntity } from '../../domain/entities/subscription.entity';
import { ISubscriptionRepository } from '../../domain/repositories/subscription.repository';
import { StripeService } from '../../infraestructure/stripe.service';

export class CreateSubscriptionUseCase {
  constructor(
    @Inject('ISubscriptionRepository')
    private readonly subscriptionRepo: ISubscriptionRepository,
    @Inject(StripeService) private readonly stripeService: StripeService,
  ) {}

  async execute({
    userId,
    email,
    planName,
    amount,
    currency,
  }: {
    userId: string;
    email: string;
    planName: string;
    amount: number;
    currency?: string;
  }): Promise<{ url: string }> {
    const customer = await this.stripeService.createCustomer(email, userId);
    const product = await this.stripeService.getOrCreateProduct(planName);
    const price = await this.stripeService.getOrCreatePrice(
      product.id,
      amount,
      currency || 'usd',
    );
    const url = await this.stripeService.createCheckoutSession(
      customer.id,
      price.id,
      process.env.STRIPE_SUCCESS_URL || 'https://tuapp.com/success',
      process.env.STRIPE_CANCEL_URL || 'https://tuapp.com/cancel',
    );

    const subscriptionMapperToEntity = new SubscriptionEntity(
      randomUUID(),
      userId,
      url.id,
      product.id,
      StatusSubscription.ACTIVE,
      new Date(),
    );

    await this.subscriptionRepo.create(subscriptionMapperToEntity);
    return { url: url.url ?? '' };
  }
}
