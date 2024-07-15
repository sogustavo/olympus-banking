import { Controller, Get, Param } from '@nestjs/common';
import { StatementsService } from '../services/statements.service';
import { GetStatementDto } from '@olympus-banking/dtos';
import { ApiTags } from '@nestjs/swagger';

const controller = 'statements';

@Controller(`accounts/:accountId/${controller}`)
@ApiTags(controller)
export class StatementsController {
  constructor(private readonly service: StatementsService) {}

  @Get(':year/:month')
  async getStatements(
    @Param('accountId') accountId: string,
    @Param('year') year: number,
    @Param('month') month: number,
  ): Promise<GetStatementDto[]> {
    return this.service.getStatements(accountId, year, month);
  }
}
