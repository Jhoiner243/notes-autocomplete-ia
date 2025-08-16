export class AutoCompletionEntity {
  constructor(
    public readonly model: string,
    public readonly context: string,
    public readonly prompt: string,
  ) {}
}
