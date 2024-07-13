import { IsString, IsNotEmpty, isNotEmpty, ArrayMinSize, ArrayNotEmpty, ArrayUnique, ValidateNested } from 'class-validator';
import { Expose, plainToClass, Transform, Type } from 'class-transformer';
import { MoneyDto } from './money.dto';

export class CreateAccountDto {
  @IsString()
  @IsNotEmpty()
  customerName: string;

  @ValidateNested({ each: true })
  @Type(() => MoneyDto)
  @ArrayMinSize(1)
  @ArrayNotEmpty()
  @ArrayUnique((value: MoneyDto) => value.currency)
  balances: MoneyDto[];
}

export class UpdateAccountDto {
  @IsString()
  @IsNotEmpty()
  customerName: string;

  @ValidateNested({ each: true })
  @Type(() => MoneyDto)
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
  @Transform(({ obj: { balances } }: { obj: { balances: Map<string, number> } }) =>
    Array.from(balances.entries()).map(([currency, amount]) => ({ currency, amount })))
  balances: MoneyDto[];

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  static fromObject(obj: unknown, excludeExtraneousValues: boolean = true) {
    return plainToClass(GetAccountDto, obj, { excludeExtraneousValues });
  }
}
