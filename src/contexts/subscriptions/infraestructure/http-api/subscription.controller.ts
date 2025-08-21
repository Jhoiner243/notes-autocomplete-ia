import { Body, Controller, Get, Inject, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import Stripe from 'stripe';
import { CreateSubscriptionUseCase } from '../../application/use-cases/create-subscription.use-case';
import { GetPlansUseCase } from '../../application/use-cases/get-plans.use-case';
import { HandleStripeWebhookUseCase } from '../../application/use-cases/handle-stripe-webhook.use-case';
import { Plan } from '../../domain/value-objects/planes.value-object';

@Controller()
export class SubscriptionController {
  constructor(
    @Inject(GetPlansUseCase)
    private readonly getPlansUC: GetPlansUseCase,
    @Inject(CreateSubscriptionUseCase)
    private readonly createSubUC: CreateSubscriptionUseCase,
    @Inject(HandleStripeWebhookUseCase)
    private readonly webhookUC: HandleStripeWebhookUseCase,
  ) {}

  @Post('/subscriptions/start')
  async startSubscription(
    @Body()
    body: {
      userId: string;
      email: string;
      planName: string;
      amount: number;
      currency?: string;
    },
  ) {
    return this.createSubUC.execute(body);
  }

  @Post('/stripe/webhook')
  async handleWebhook(@Req() req: Request, @Res() res: Response) {
    await this.webhookUC.execute(req.body as Stripe.Event);
    res.json({ received: true });
  }

  @Get('/plans')
  getPlans(): Plan[] {
    return this.getPlansUC.execute();
  }
}
