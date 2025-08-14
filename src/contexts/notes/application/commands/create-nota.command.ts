export class CreateNotaCommand {
  constructor(
    public readonly title: string,
    public readonly content: string,
    public readonly metadata: object,
    public readonly version: number,
  ) {}
}
