export abstract class ICompletion {
  abstract completionSdkAi({
    prompt,
    context,
    token_max,
  }: {
    token_max: number;
    prompt: string;
    context: string;
  }): Promise<{ completion: string }>;
}
