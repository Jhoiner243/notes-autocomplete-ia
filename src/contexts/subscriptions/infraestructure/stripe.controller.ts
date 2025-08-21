/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { StripeService } from './stripe.service';

@Controller()
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

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
    // 1. Crear o buscar customer
    const customer = await this.stripeService.createCustomer(
      body.email,
      body.userId,
    );
    // 2. Crear o buscar producto y price
    const product = await this.stripeService.getOrCreateProduct(body.planName);
    const price = await this.stripeService.getOrCreatePrice(
      product.id,
      body.amount,
      body.currency || 'usd',
    );
    // 3. Crear sesión de checkout
    const url = await this.stripeService.createCheckoutSession(
      customer.id,
      price.id,
      process.env.STRIPE_SUCCESS_URL || 'https://tuapp.com/success',
      process.env.STRIPE_CANCEL_URL || 'https://tuapp.com/cancel',
    );
    return { url };
  }

  @Post('/stripe/webhook')
  async handleWebhook(@Req() req: Request, @Res() res: Response) {
    const sig = req.headers['stripe-signature'] as string;
    let event;
    try {
      event = (await import('stripe')).default.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET as string,
      );
    } catch (err) {
      return res.status(400).send(`Webhook Error: ${(err as Error).message}`);
    }
    this.stripeService.handleWebhookEvent(event);
    res.json({ received: true });
  }
}
