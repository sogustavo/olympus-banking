import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { GetStatementDto } from '@olympus-banking/dtos';
import { Statement } from '@olympus-banking/schemas';
import { Model } from 'mongoose';

@Injectable()
export class StatementsService {
  constructor(
    @InjectModel(Statement.name) private statements: Model<Statement>,
  ) {}

  async getStatements(
    accountId: string,
    year: number,
    month: number,
  ): Promise<GetStatementDto[]> {
    const statements = await this.statements
      .find({ accountId, year, month })
      .exec();

    if (!statements || statements.length === 0) {
      return [];
    }

    return statements.map((statement) =>
      GetStatementDto.fromObject(statement.toObject()),
    );
  }
}
