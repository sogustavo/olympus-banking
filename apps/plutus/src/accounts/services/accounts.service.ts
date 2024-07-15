import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  CreateAccountDto,
  GetAccountDto,
  UpdateAccountDto,
} from '@olympus-banking/dtos';
import { Account } from '@olympus-banking/schemas';
import { Model } from 'mongoose';

@Injectable()
export class AccountsService {
  constructor(@InjectModel(Account.name) private accounts: Model<Account>) {}

  async createAccount(dto: CreateAccountDto): Promise<GetAccountDto> {
    const model = new this.accounts({
      customerName: dto.customerName,
      balances: new Map<string, number>(
        dto.balances?.map((b) => [b.currency, b.amount]),
      ),
    });

    const account = await model.save();

    // TODO: I will not do it right now, but we should consider creating a INBOUND Transaction here as well, otherwise, the statement will be empty, even the account having balance

    return GetAccountDto.fromObject(account.toObject());
  }

  async getAccount(id: string): Promise<GetAccountDto> {
    const account = await this.accounts.findById(id).exec();

    if (!account) {
      throw new NotFoundException(`Account ${id} not found`);
    }

    return GetAccountDto.fromObject(account.toObject());
  }

  async updateAccount(
    id: string,
    dto: UpdateAccountDto,
  ): Promise<GetAccountDto> {
    const account = await this.accounts
      .findByIdAndUpdate(
        id,
        {
          customerName: dto.customerName,
          balances: new Map<string, number>(
            dto.balances?.map((b) => [b.currency, b.amount]),
          ),
          updatedAt: Date.now(),
        },
        { new: true },
      )
      .exec();

    // TODO: Same here

    if (!account) {
      throw new NotFoundException(`Account ${id} not found`);
    }

    return GetAccountDto.fromObject(account.toObject());
  }
}
