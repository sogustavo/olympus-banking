import { Expose } from 'class-transformer';
import { IsString, IsNotEmpty, IsNumber, IsPositive, Min } from 'class-validator';

export class MoneyDto {
  @IsString()
  @IsNotEmpty()
  @Expose()
  currency: string;

  @IsNumber()
  @IsPositive()
  @Min(0.01)
  @Expose()
  amount: number;
}