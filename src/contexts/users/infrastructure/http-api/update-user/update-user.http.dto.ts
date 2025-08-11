import { IsString } from 'class-validator';

export class UpdateUserDtoHttp {
  @IsString()
  id: string;
}
