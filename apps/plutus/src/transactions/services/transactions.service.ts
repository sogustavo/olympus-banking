import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTransactionDto, GetTransactionDto } from '@olympus-banking/dtos';
import {
  Account,
  Transaction,
  TransactionType,
} from '@olympus-banking/schemas';
import { Model } from 'mongoose';
import { EventsService } from '../../events/services/events.service';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction.name) private transactions: Model<Transaction>,
    @InjectModel(Account.name) private accounts: Model<Account>,
    private readonly events: EventsService,
  ) {}

  async createTransaction(
    accountId: string,
    dto: CreateTransactionDto,
  ): Promise<GetTransactionDto> {
    const account = await this.accounts.findById(accountId);

    if (!account) {
      throw new NotFoundException(`Account ${accountId} not found`);
    }

    const { currency, amount, type } = dto;

    const balance = account.balances.get(currency) || 0;

    switch (type) {
      case TransactionType.INBOUND:
        account.balances.set(currency, balance + amount);
        break;
      case TransactionType.OUTBOUND:
        if (balance < amount) {
          throw new UnprocessableEntityException(
            `Insufficient funds for currency ${currency}`,
          );
        }

        account.balances.set(currency, balance - amount);
        break;
      default:
        throw new BadRequestException(`Invalid operation ${type}`);
    }

    const model = new this.transactions({
      accountId,
      type,
      currency,
      amount,
    });

    const session = await this.transactions.db.startSession();

    try {
      session.startTransaction();

      await account.save({ session });

      const transaction = await model.save({ session });

      await session.commitTransaction();

      const object = transaction.toObject();

      this.events.send(object, 'transaction');

      return GetTransactionDto.fromObject(object);
    } catch (error) {
      if (session) {
        await session.abortTransaction();
      }

      throw error;
    } finally {
      if (session) {
        session.endSession();
      }
    }
  }

  async getTransaction(
    accountId: string,
    id: string,
  ): Promise<GetTransactionDto> {
    const transaction = await this.transactions
      .findOne({ accountId, _id: id })
      .exec();

    if (!transaction) {
      throw new NotFoundException(
        `Transaction ${id} not found for account ${accountId}`,
      );
    }

    return GetTransactionDto.fromObject(transaction.toObject());
  }
}
