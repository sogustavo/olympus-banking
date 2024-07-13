import { IsEnum } from 'class-validator';
import { TransactionType } from '@olympus-banking/schemas';
import { MoneyDto } from './money.dto';
import { Expose, plainToClass, Type } from 'class-transformer';

export class CreateTransactionDto extends MoneyDto {
  @IsEnum(TransactionType)
  type: TransactionType;
}

export class GetTransactionDto extends MoneyDto {
  @Expose()
  id: string;

  @Expose()
  @Type(() => String)
  accountId: string;

  @Expose()
  type: TransactionType;

  @Expose()
  createdAt: Date;

  static fromObject(obj: unknown, excludeExtraneousValues: boolean = true) {
    return plainToClass(GetTransactionDto, obj, { excludeExtraneousValues });
  }
}
