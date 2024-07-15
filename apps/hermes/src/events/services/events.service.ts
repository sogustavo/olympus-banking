import { Injectable } from '@nestjs/common';
import { SQS } from 'aws-sdk';
import {
  DeleteMessageRequest,
  ReceiveMessageRequest,
} from 'aws-sdk/clients/sqs';
import { aws } from '../../config';
import { MessageDto } from '../dtos/message.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction, Statement } from '@olympus-banking/schemas';

@Injectable()
export class EventsService {
  private sqs: SQS;

  constructor(
    @InjectModel(Statement.name) private statements: Model<Statement>,
  ) {
    this.sqs = new SQS({
      endpoint: aws.sqs.endpoint,
      accessKeyId: aws.accessKeyId,
      secretAccessKey: aws.secretAccessKey,
      region: aws.region,
      sslEnabled: aws.sslEnabled,
    });
  }

  onModuleInit() {
    this.process();
  }

  async process(): Promise<void> {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      try {
        const request: ReceiveMessageRequest = {
          QueueUrl: aws.sqs.queue,
          MaxNumberOfMessages: 10,
          WaitTimeSeconds: 20,
        };

        const response = await this.sqs.receiveMessage(request).promise();

        if (response.Messages && response.Messages.length > 0) {
          for (const message of response.Messages) {
            const dto: MessageDto = JSON.parse(message.Body);

            const transaction = dto.detail as Transaction;

            console.log({ transaction });

            const date = new Date(transaction.createdAt);
            const month = date.getMonth() + 1; // JavaScript months are 0-based
            const year = date.getFullYear();

            const { accountId, currency } = transaction;

            await this.statements.updateOne(
              { accountId, currency, month, year },
              { $addToSet: { transactions: transaction } },
              { upsert: true },
            );

            await this.delete(message.ReceiptHandle);
          }
        }
      } catch (error) {
        // TODO: handle fail
        console.error(error);
      }
    }
  }

  private async delete(handle: string): Promise<void> {
    const deleteMessageParams: DeleteMessageRequest = {
      QueueUrl: aws.sqs.queue,
      ReceiptHandle: handle,
    };

    await this.sqs.deleteMessage(deleteMessageParams).promise();
  }
}
