export class DeleteNotaCommand {
  constructor(
    public readonly id: string,
    public readonly hard = false,
  ) {}
}
