import { IsString, IsNotEmpty, ValidateNested, ArrayMinSize, ArrayNotEmpty, ArrayUnique } from 'class-validator';
import { Type } from 'class-transformer';
import { BalanceDto } from './balance.dto';

export class CreateAccountDto {
  @IsString()
  @IsNotEmpty()
  customerName: string;

  @ValidateNested({ each: true })
  @Type(() => BalanceDto)
  @ArrayMinSize(1)
  @ArrayNotEmpty()
  @ArrayUnique((value: BalanceDto) => value.currency)
  balances: BalanceDto[];
}

export class UpdateAccountDto {
  @IsString()
  @IsNotEmpty()
  customerName: string;

  @ValidateNested({ each: true })
  @Type(() => BalanceDto)
  @ArrayMinSize(1)
  @ArrayNotEmpty()
  @ArrayUnique((value: BalanceDto) => value.currency)
  balances: BalanceDto[];
}

export class GetAccountDto {
  id: string;
  customerName: string;
  balances: BalanceDto[];
  createdAt: Date;
  updatedAt: Date;
}
