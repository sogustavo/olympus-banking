import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { TransactionsService } from '../services/transactions.service';
import { CreateTransactionDto, GetTransactionDto } from '@olympus-banking/dtos';
import { ApiTags } from '@nestjs/swagger';

const controller = 'transactions';

@Controller(`accounts/:accountId/${controller}`)
@ApiTags(controller)
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
