export class BillingHistoryPaymentsEntity {
  constructor(
    public readonly subscriptionId: string,
    public readonly stripeInvoiceId: string,
    public readonly amount: number,
    public readonly status: string,
  ) {}
}
