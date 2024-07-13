import { IsString, IsNotEmpty, IsNumber, IsPositive, Min } from 'class-validator';

export class BalanceDto {
  @IsString()
  @IsNotEmpty()
  currency: string;

  @IsNumber()
  @IsPositive()
  @Min(0.01)
  amount: number;
}