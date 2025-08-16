export class CompletionCommand {
  constructor(
    public readonly prompt: string,
    public readonly context: string,
  ) {}
}
