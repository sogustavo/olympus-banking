import { Expose, plainToClass, Transform } from 'class-transformer';
import { MoneyDto } from './money.dto';
import { ApiProperty } from '@nestjs/swagger';
import { GetTransactionDto } from './transaction.dto';

export class GetStatementDto {
  @ApiProperty({ description: 'Statement id' })
  @Expose()
  id: string;

  @ApiProperty({ description: 'Account id' })
  @Expose()
  accountId: string;

  @ApiProperty({ description: 'Currency' })
  @Expose()
  currency: string;

  @ApiProperty({ description: 'Year' })
  @Expose()
  year: number;

  @ApiProperty({ description: 'Month' })
  @Expose()
  month: number;

  @ApiProperty({
    type: [MoneyDto],
    description: 'Transactions of the statement',
  })
  @Expose()
  @Transform(
    ({ obj: { transactions } }: { obj: { transactions: unknown[] } }) => {
      console.log({ transactions });
      return transactions.map((v) => GetTransactionDto.fromObject(v));
    },
  )
  transactions: GetTransactionDto[];

  @ApiProperty({ description: 'Created date' })
  @Expose()
  createdAt: Date;

  static fromObject(obj: unknown, excludeExtraneousValues: boolean = true) {
    return plainToClass(GetStatementDto, obj, { excludeExtraneousValues });
  }
}
