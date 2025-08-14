import { IsJSON, IsNumber, IsString } from 'class-validator';
import { MetadataValueObjects } from '../../../domain/value-objects/metadata-json.value-object';

export class CreateNotaDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsJSON({
    context: MetadataValueObjects,
  })
  metadata: object;

  @IsNumber()
  version: number;
}
