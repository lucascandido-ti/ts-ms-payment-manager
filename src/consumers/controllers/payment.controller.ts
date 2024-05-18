import {
  CreatePaymentCommand,
  ProcessPaymentCommand,
} from '@/core/application/payment/commands';

import { GetPaymentByOrderQuery } from '@/core/application/payment/queries';

import { Order } from '@/core/domain/order/entity';

import { IQueueData } from '@/core/domain/queue';
import { IPayment } from '@/core/domain/payment/interfaces';

import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Param,
} from '@nestjs/common';

import { CommandBus } from '@nestjs/cqrs';
import { Ctx, EventPattern, RmqContext } from '@nestjs/microservices';

@Controller('payment')
export class PaymentController {
  private readonly logger = new Logger(PaymentController.name);

  constructor(private commandBus: CommandBus) {}

  @EventPattern('created-new-order')
  async getOrderEvent(@Ctx() context: RmqContext): Promise<void> {
    const getMessage = context.getMessage();
    const message = Buffer.from(getMessage.content);
    const { data } = JSON.parse(message.toString()) as IQueueData<Order>;

    const response = await this.commandBus.execute(
      new CreatePaymentCommand({ order: data }),
    );

    this.logger.debug(`getOrderEvent - result: `, JSON.stringify(response));

    if (response.Success)
      await this.commandBus.execute(
        new ProcessPaymentCommand({ payment: response.Data }),
      );
  }

  @Get('order/:orderId')
  @HttpCode(HttpStatus.OK)
  async GetByOrder(@Param('orderId') orderId: string): Promise<IPayment> {
    return this.commandBus.execute(new GetPaymentByOrderQuery(orderId));
  }
}
