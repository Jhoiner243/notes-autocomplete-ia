import { IsEmail, IsNumber, IsString } from 'class-validator';

export class SubscriptionStartDto {
  @IsString()
  userId: string;

  @IsEmail()
  email: string;

  @IsString()
  planName: string;

  @IsNumber()
  amount: number;

  @IsString()
  currency?: string;
}
