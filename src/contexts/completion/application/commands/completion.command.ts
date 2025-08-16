export class CompletionCommand {
  constructor(
    public readonly model: string,
    public readonly prompt: string,
    public readonly context: string,
  ) {}
}
