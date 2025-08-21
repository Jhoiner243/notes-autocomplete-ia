export class CreateSubscriptionCommand {
  constructor(
    public readonly userId: string,
    public readonly email: string,
    public readonly planName: string,
    public readonly amount: number,
    public readonly currency?: string,
  ) {}
}
