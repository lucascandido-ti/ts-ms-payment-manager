import { PAYMENT_SERVICE } from '@/config';
import { IQueueRepository } from '@/core/domain/queue/ports/queue.interface.port';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class RabbitMQRepository implements IQueueRepository {
  private readonly logger = new Logger(RabbitMQRepository.name);

  constructor(
    @Inject(PAYMENT_SERVICE)
    private readonly rabbitClient: ClientProxy,
  ) {}

  publish<T>(data: T, routingKey: string): void {
    this.rabbitClient.emit(routingKey, data);

    this.logger.debug(`${typeof data} Published`);
  }
}
