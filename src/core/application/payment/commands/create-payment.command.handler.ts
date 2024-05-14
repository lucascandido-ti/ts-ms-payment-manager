import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { PAYMENT_REPOSITORY } from '@/config';
import { IPaymentRepository } from '@/core/domain/payment';

import { CreatePaymentCommand } from './create-payment.command';
import { PaymentDto } from '../dto';
import { PaymentResponse } from '../responses/payment.response';

@CommandHandler(CreatePaymentCommand)
export class CreatePaymentCommandHandler
  implements ICommandHandler<CreatePaymentCommand>
{
  constructor(
    @Inject(PAYMENT_REPOSITORY)
    private readonly _paymentRepository: IPaymentRepository,
  ) {}

  async execute({ request }: CreatePaymentCommand) {
    const payment = await this._paymentRepository.CreatePayment(request.order);

    const paymentDto = new PaymentDto().MapToDTO(payment);

    const response = new PaymentResponse(paymentDto);
    response.Success = true;

    return response;
  }
}
