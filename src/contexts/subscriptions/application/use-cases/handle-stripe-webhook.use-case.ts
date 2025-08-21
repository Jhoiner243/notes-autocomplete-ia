import { Inject } from '@nestjs/common';
import { IBillingHistoryRepository } from '../../domain/repositories/billing-history.repository';
import { ISubscriptionRepository } from '../../domain/repositories/subscription.repository';

export class HandleStripeWebhookUseCase {
  constructor(
    @Inject('ISubscriptionRepository')
    private readonly subscriptionRepo: ISubscriptionRepository,
    @Inject('IBillingHistoryRepository')
    private readonly billingRepo: IBillingHistoryRepository,
  ) {}

  async execute(event: any): Promise<void> {
    // Aquí se debe enrutar el evento y actualizar el estado de la suscripción y pagos
    // Ejemplo: if (event.type === 'invoice.paid') { ... }
  }
}
