import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { TransactionsService } from '../services/transactions.service';
import { CreateTransactionDto, GetTransactionDto } from '@olympus-banking/dtos';

@Controller('accounts/:accountId/transactions')
export class TransactionsController {
  constructor(private readonly service: TransactionsService) {}

  @Post()
  async createTransaction(
    @Param('accountId') accountId: string,
    @Body() dto: CreateTransactionDto,
  ): Promise<GetTransactionDto> {
    return this.service.createTransaction(accountId, dto);
  }

  @Get(':id')
  async getTransaction(
    @Param('accountId') accountId: string,
    @Param('id') id: string,
  ): Promise<GetTransactionDto> {
    return this.service.getTransaction(accountId, id);
  }
}
