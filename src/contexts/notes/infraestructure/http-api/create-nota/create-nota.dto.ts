import { Type } from 'class-transformer';
import { IsString, Length, ValidateNested } from 'class-validator';
import { MetadataDto } from '../dto/metadata.dto';

export class CreateNotaDto {
  @IsString()
  @Length(1, 100)
  title: string;

  @IsString()
  @Length(1, 10_000)
  content: string;

  @ValidateNested()
  @Type(() => MetadataDto)
  metadata: MetadataDto;
}
