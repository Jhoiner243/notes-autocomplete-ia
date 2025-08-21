export class BillingHistoryEntity {
  constructor(
    public readonly id: string,
    public readonly subscriptionId: string,
    public readonly stripeInvoiceId: string,
    public readonly amount: number,
    public status: string,
    public readonly createdAt: Date,
  ) {}

  updateStatus(newStatus: string) {
    this.status = newStatus;
  }
}
