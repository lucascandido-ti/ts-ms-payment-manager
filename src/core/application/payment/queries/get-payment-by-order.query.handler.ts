import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { PAYMENT_REPOSITORY } from '@/config';
import { IPaymentRepository } from '@/core/domain/ports';

import { GetPaymentByOrderQuery } from './get-payment-by-order.query';

@CommandHandler(GetPaymentByOrderQuery)
export class GetPaymentByOrderQueryHandler
  implements ICommandHandler<GetPaymentByOrderQuery>
{
  constructor(
    @Inject(PAYMENT_REPOSITORY)
    private readonly _paymentRepository: IPaymentRepository,
  ) {}

  async execute(query: GetPaymentByOrderQuery) {
    const { orderId } = query;
    const order = await this._paymentRepository.GetByOrder(+orderId);

    return order;
  }
}
