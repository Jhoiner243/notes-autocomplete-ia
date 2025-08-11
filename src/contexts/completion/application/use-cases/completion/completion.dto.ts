import { IsNumber, IsString } from 'class-validator';

export class CompletionDto {
  @IsString()
  prompt: string;

  @IsString()
  context: string;

  @IsNumber()
  token_max: number;
}
