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
import { ApiProperty } from '@nestjs/swagger';

export class CreateAccountDto {
  @ApiProperty({ description: 'Customer name' })
  @IsString()
  @IsNotEmpty()
  @Matches(/\S/, {
    message: 'customerName should not be empty or contain only spaces',
  })
  customerName: string;

  @ApiProperty({
    type: [MoneyDto],
    description: 'Balance list in different currencies',
  })
  @Type(() => MoneyDto)
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @ArrayNotEmpty()
  @ArrayUnique((value: MoneyDto) => value.currency)
  balances: MoneyDto[];
}

export class UpdateAccountDto {
  @ApiProperty({ description: 'Customer name' })
  @IsString()
  @IsNotEmpty()
  @Matches(/\S/, {
    message: 'customerName should not be empty or contain only spaces',
  })
  customerName: string;

  @ApiProperty({
    type: [MoneyDto],
    description: 'Balance list in different currencies',
  })
  @Type(() => MoneyDto)
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @ArrayNotEmpty()
  @ArrayUnique((value: MoneyDto) => value.currency)
  balances: MoneyDto[];
}

export class GetAccountDto {
  @ApiProperty({ description: 'Account id' })
  @Expose()
  id: string;

  @ApiProperty({ description: 'Customer name' })
  @Expose()
  customerName: string;

  @ApiProperty({
    type: [MoneyDto],
    description: 'Balance list in different currencies',
  })
  @Expose()
  @Transform(
    ({ obj: { balances } }: { obj: { balances: Map<string, number> } }) =>
      Array.from(balances.entries()).map(([currency, amount]) => ({
        currency,
        amount,
      })),
  )
  balances: MoneyDto[];

  @ApiProperty({ description: 'Created date' })
  @Expose()
  createdAt: Date;

  @ApiProperty({ description: 'Updated date' })
  @Expose()
  updatedAt: Date;

  static fromObject(obj: unknown, excludeExtraneousValues: boolean = true) {
    return plainToClass(GetAccountDto, obj, { excludeExtraneousValues });
  }
}
