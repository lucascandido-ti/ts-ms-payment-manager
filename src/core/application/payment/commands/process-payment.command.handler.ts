import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { PAYMENT_REPOSITORY } from '@/config';
import { IPaymentRepository } from '@/core/domain/payment';
import { ProcessPaymentCommand } from './process-payment.command';
import { PaymentDto } from '../dto';
import { PaymentResponse } from '../responses';

@CommandHandler(ProcessPaymentCommand)
export class ProcessPaymentCommandHandler
  implements ICommandHandler<ProcessPaymentCommand>
{
  constructor(
    @Inject(PAYMENT_REPOSITORY)
    private readonly _paymentRepository: IPaymentRepository,
  ) {}

  async execute({ request }: ProcessPaymentCommand) {
    const payment = await this._paymentRepository.ProcessPayment(
      request.payment,
    );

    const paymentDto = new PaymentDto().MapToDTO(payment);

    const response = new PaymentResponse(paymentDto);
    response.Success = true;

    return response;
  }
}
