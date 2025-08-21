import { Injectable, Logger } from '@nestjs/common';
import Stripe from 'stripe';
import { envs } from '../../../common/config/config';

// El tipo 'Interval' de Stripe para la recurrencia de un precio.
type Interval = 'day' | 'week' | 'month' | 'year';

@Injectable()
export class StripeService {
  private readonly stripe: Stripe;
  private readonly logger = new Logger(StripeService.name);

  constructor() {
    this.stripe = new Stripe(envs.stripeSecretKey, {
      typescript: true,
    });
  }

  constructorEvent(req: Buffer, signature: string): Stripe.Event {
    try {
      return this.stripe.webhooks.constructEvent(
        req,
        signature,
        envs.endpointStripeWebhook ?? '',
      );
    } catch (err) {
      if (err instanceof Error) {
        console.error(
          '⚠️  Webhook signature verification failed:',
          err.message,
        );
      }
      throw new Error('Webhook signature verification failed.');
    }
  }

  async createCustomer(
    email: string,
    userId: string,
  ): Promise<Stripe.Customer> {
    return await this.stripe.customers.create({
      email,
      metadata: { userId },
    });
  }

  async getOrCreateProduct(productName: string): Promise<Stripe.Product> {
    let existingProduct: Stripe.Product | undefined;

    for await (const product of this.stripe.products.list({ limit: 100 })) {
      if (product.name.toLowerCase() === productName.toLowerCase()) {
        existingProduct = product;
        break;
      }
    }

    if (existingProduct) {
      return existingProduct;
    }

    return this.stripe.products.create({
      name: productName,
    });
  }

  async getOrCreatePrice(
    productId: string,
    amount: number,
    currency: string = 'usd',
    interval: Interval = 'month',
  ): Promise<Stripe.Price> {
    const unitAmount = Math.round(amount * 100);

    let existingPrice: Stripe.Price | undefined;
    for await (const price of this.stripe.prices.list({
      product: productId,
      limit: 100,
    })) {
      if (
        price.unit_amount === unitAmount &&
        price.currency === currency &&
        price.recurring?.interval === interval
      ) {
        existingPrice = price;
        break;
      }
    }

    if (existingPrice) {
      return existingPrice;
    }

    return this.stripe.prices.create({
      product: productId,
      unit_amount: unitAmount,
      currency,
      recurring: { interval },
    });
  }

  async createSubscription(
    customerId: string,
    priceId: string,
  ): Promise<Stripe.Subscription> {
    return await this.stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      payment_behavior: 'default_incomplete',
      expand: ['latest_invoice.payment_intent'],
    });
  }

  async createCheckoutSession(
    customerId: string,
    priceId: string,
    successUrl: string,
    cancelUrl: string,
  ): Promise<Stripe.Checkout.Session> {
    return await this.stripe.checkout.sessions.create({
      customer: customerId,
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'subscription',
      success_url: successUrl,
      cancel_url: cancelUrl,
    });
  }

  handleWebhookEvent(event: Stripe.Event) {
    this.logger.log(`Received Stripe event: ${event.type}`);
    // RECOMENDACIÓN: Aquí es donde manejarías los diferentes eventos.
    // switch (event.type) {
    //   case 'invoice.paid':
    //     // Lógica para una factura pagada
    //     break;
    //   case 'customer.subscription.deleted':
    //     // Lógica para una suscripción cancelada
    //     break;
    //   default:
    //     this.logger.warn(`Unhandled event type: ${event.type}`);
    // }
  }
}
