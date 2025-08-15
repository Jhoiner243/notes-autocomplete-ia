import { IsString } from 'class-validator';

export class AutoCompletionDto {
  @IsString()
  public context: string;

  @IsString()
  public prompt: string;
}
