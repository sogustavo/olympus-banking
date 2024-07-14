import { Controller, Get, Post, Put, Param, Body } from '@nestjs/common';
import { AccountsService } from '../services/accounts.service';
import {
  CreateAccountDto,
  GetAccountDto,
  UpdateAccountDto,
} from '@olympus-banking/dtos';
import { ApiTags } from '@nestjs/swagger';

const controller = 'accounts';

@Controller(controller)
@ApiTags(controller)
export class AccountsController {
  constructor(private readonly service: AccountsService) {}

  @Post()
  async createAccount(@Body() dto: CreateAccountDto): Promise<GetAccountDto> {
    return this.service.createAccount(dto);
  }

  @Get(':id')
  async getAccount(@Param('id') id: string): Promise<GetAccountDto> {
    return this.service.getAccount(id);
  }

  @Put(':id')
  async updateAccount(
    @Param('id') id: string,
    @Body() dto: UpdateAccountDto,
  ): Promise<GetAccountDto> {
    return this.service.updateAccount(id, dto);
  }
}
