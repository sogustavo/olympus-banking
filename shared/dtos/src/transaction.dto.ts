import { IsString, IsNotEmpty, IsEnum, IsNumber, IsPositive, Min } from 'class-validator';
import { TransactionType } from '@olympus-banking/schemas/src';


export class CreateTransactionDto {
  @IsEnum(TransactionType)
  type: TransactionType;

  @IsString()
  @IsNotEmpty()
  currency: string;

  @IsNumber()
  @IsPositive()
  @Min(0.01)
  amount: number;
}


export class GetTransactionDto {
  id: string;
  accountId: string;
  type: TransactionType;
  currency: string;
  amount: number;
  createdAt: Date;
}
