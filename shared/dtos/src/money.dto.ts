import { Expose } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  Matches,
} from 'class-validator';

export class MoneyDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/\S/, {
    message: 'currency should not be empty or contain only spaces',
  })
  @Expose()
  currency: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  @Expose()
  amount: number;
}
