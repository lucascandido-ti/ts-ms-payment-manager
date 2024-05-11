import { GetPaymentByOrderQuery } from '@/core/application/payment/queries';
import { IPayment } from '@/core/domain/interfaces';
import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

@Controller('payment')
export class PaymentController {
  constructor(private commandBus: CommandBus) {}

  @Get('order/:orderId')
  @HttpCode(HttpStatus.OK)
  async GetByOrder(@Param('orderId') orderId: string): Promise<IPayment> {
    return this.commandBus.execute(new GetPaymentByOrderQuery(orderId));
  }
}
