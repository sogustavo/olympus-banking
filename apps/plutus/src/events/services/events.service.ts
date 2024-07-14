import { Injectable } from '@nestjs/common';
import { EventBridge } from 'aws-sdk';
import { aws } from 'src/config';

@Injectable()
export class EventsService {
  private eventBridge: EventBridge;

  constructor() {
    this.eventBridge = new EventBridge({
      endpoint: aws.eventBridge.endpoint,
      accessKeyId: aws.accessKeyId,
      secretAccessKey: aws.secretAccessKey,
      region: aws.region,
      sslEnabled: aws.sslEnabled,
    });
  }

  async send(
    event: unknown,
    type: string,
    busName: string = 'default',
  ): Promise<void> {
    const params = {
      Entries: [
        {
          Source: 'olympus-banking.plutus',
          DetailType: type,
          Detail: JSON.stringify(event),
          EventBusName: busName,
        },
      ],
    };

    await this.eventBridge.putEvents(params).promise();
  }
}
