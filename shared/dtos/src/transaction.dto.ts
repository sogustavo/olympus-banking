import { IsEnum } from 'class-validator';
import { TransactionType } from '@olympus-banking/schemas';
import { MoneyDto } from './money.dto';
import { Expose, plainToClass, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionDto extends MoneyDto {
  @ApiProperty({ description: 'Transaction type' })
  @IsEnum(TransactionType)
  type: TransactionType;
}

export class GetTransactionDto extends MoneyDto {
  @ApiProperty({ description: 'Transaction id' })
  @Expose()
  id: string;

  @ApiProperty({ description: 'Account id' })
  @Expose()
  @Type(() => String)
  accountId: string;

  @ApiProperty({ description: 'Transaction type' })
  @Expose()
  type: TransactionType;

  @ApiProperty({ description: 'Created date' })
  @Expose()
  createdAt: Date;

  static fromObject(obj: unknown, excludeExtraneousValues: boolean = true) {
    return plainToClass(GetTransactionDto, obj, { excludeExtraneousValues });
  }
}
