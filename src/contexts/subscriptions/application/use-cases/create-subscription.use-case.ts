/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Inject } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { StatusSubscription } from '../../../../../generated/prisma';
import { SubscriptionEntity } from '../../domain/entities/subscription.entity';
import { ISubscriptionRepository } from '../../domain/repositories/subscription.repository';
import { StripeService } from '../../infraestructure/stripe.service';
import { CreateSubscriptionCommand } from '../commands/create-subscription.commnand';

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
  }: CreateSubscriptionCommand): Promise<{ url: string }> {
    const customer = await this.stripeService.createCustomer(email, userId);
    const product = await this.stripeService.getOrCreateProduct(planName);
    const price = await this.stripeService.getOrCreatePrice(
      product.id,
      amount,
      currency || 'COP',
    );
    const session = await this.stripeService.createCheckoutSession(
      customer.id,
      price.id,
      process.env.STRIPE_SUCCESS_URL || 'https://tuapp.com/success',
      process.env.STRIPE_CANCEL_URL || 'https://tuapp.com/cancel',
    );

    const subscriptionMapperToEntity = new SubscriptionEntity(
      randomUUID(),
      userId,
      session.id,
      product.id,
      //El status de la suscripción se actualizará en el webhook y aquí se establece PENDING
      StatusSubscription.ACTIVE,
      new Date(),
    );

    await this.subscriptionRepo.create(subscriptionMapperToEntity);
    return { url: session.url ?? '' };
  }
}
