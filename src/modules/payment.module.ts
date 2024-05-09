import { CqrsModule } from '@nestjs/cqrs';
import { Module, Provider } from '@nestjs/common';

import { PAYMENT_REPOSITORY } from '@/config';
import { PaymentRepository } from '@/adapters/data';
import { PaymentController } from '@/consumers/controllers';
import { GetPaymentByOrderQueryHandler } from '@/core/application/payment/queries';

const httpControllers = [PaymentController];
const handlers: Provider[] = [GetPaymentByOrderQueryHandler];
const repositories: Provider[] = [
  { provide: PAYMENT_REPOSITORY, useClass: PaymentRepository },
];

@Module({
  imports: [CqrsModule],
  controllers: [...httpControllers],
  providers: [...handlers, ...repositories],
})
export class PaymentModule {}
