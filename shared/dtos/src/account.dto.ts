import {
  IsString,
  IsNotEmpty,
  ArrayMinSize,
  ArrayNotEmpty,
  ArrayUnique,
  ValidateNested,
  Matches,
} from 'class-validator';
import { Expose, plainToClass, Transform, Type } from 'class-transformer';
import { MoneyDto } from './money.dto';

export class CreateAccountDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/\S/, {
    message: 'customerName should not be empty or contain only spaces',
  })
  customerName: string;

  @Type(() => MoneyDto)
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @ArrayNotEmpty()
  @ArrayUnique((value: MoneyDto) => value.currency)
  balances: MoneyDto[];
}

export class UpdateAccountDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/\S/, {
    message: 'customerName should not be empty or contain only spaces',
  })
  customerName: string;

  @Type(() => MoneyDto)
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @ArrayNotEmpty()
  @ArrayUnique((value: MoneyDto) => value.currency)
  balances: MoneyDto[];
}

export class GetAccountDto {
  @Expose()
  id: string;

  @Expose()
  customerName: string;

  @Expose()
  @Transform(
    ({ obj: { balances } }: { obj: { balances: Map<string, number> } }) =>
      Array.from(balances.entries()).map(([currency, amount]) => ({
        currency,
        amount,
      })),
  )
  balances: MoneyDto[];

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  static fromObject(obj: unknown, excludeExtraneousValues: boolean = true) {
    return plainToClass(GetAccountDto, obj, { excludeExtraneousValues });
  }
}
