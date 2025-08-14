import { IsInt, IsOptional, IsString } from 'class-validator';

export class MetadataDto {
  @IsString()
  tags: string;

  @IsString()
  carpeta: string;

  @IsInt()
  version: number;

  @IsOptional()
  @IsString()
  lastEditBy?: string;
}
