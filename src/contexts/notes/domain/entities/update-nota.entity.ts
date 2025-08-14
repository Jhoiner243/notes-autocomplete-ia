// src/notas/dto/update-note.dto.ts

import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateNoteDto {
  @IsString()
  @MinLength(3)
  @IsOptional()
  readonly title?: string;

  @IsString()
  @IsOptional()
  readonly content?: string;
}
