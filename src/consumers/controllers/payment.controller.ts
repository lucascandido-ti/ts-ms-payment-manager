import {
  CreatePaymentCommand,
  ProcessPaymentCommand,
} from '@/core/application/payment/commands';
import { GetPaymentByOrderQuery } from '@/core/application/payment/queries';
import { Order } from '@/core/domain/order/entity';
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
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller('payment')
export class PaymentController {
  private readonly logger = new Logger(PaymentController.name);

  constructor(private commandBus: CommandBus) {}

  @Get('order/:orderId')
  @HttpCode(HttpStatus.OK)
  async GetByOrder(@Param('orderId') orderId: string): Promise<IPayment> {
    return this.commandBus.execute(new GetPaymentByOrderQuery(orderId));
  }

  @EventPattern()
  async getOrderEvent(@Payload() data: { Order: Order }): Promise<void> {
    const { Order } = data;

    const response = await this.commandBus.execute(
      new CreatePaymentCommand({ order: Order }),
    );

    this.logger.debug(`getOrderEvent - result: `, JSON.stringify(response));

    if (response.Success)
      await this.commandBus.execute(
        new ProcessPaymentCommand({ payment: response.Data }),
      );
    // TODO - Se resposta for sucesso emitir um novo comando para processamento do pagamento
    // E ao emitir um comando de pagamento
  }
}
