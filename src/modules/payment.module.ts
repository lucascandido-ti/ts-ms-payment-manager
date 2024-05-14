import { CqrsModule } from '@nestjs/cqrs';
import { Module, Provider } from '@nestjs/common';

import { PAYMENT_REPOSITORY, PrismaService } from '@/config';

import { PaymentRepository } from '@/adapters/data';
import { PaymentController } from '@/consumers/controllers';

import { CreatePaymentCommandHandler } from '@/core/application/payment/commands';
import { GetPaymentByOrderQueryHandler } from '@/core/application/payment/queries';

const httpControllers = [PaymentController];
const handlers: Provider[] = [
  GetPaymentByOrderQueryHandler,
  CreatePaymentCommandHandler,
];
const services: Provider[] = [PrismaService];
const repositories: Provider[] = [
  { provide: PAYMENT_REPOSITORY, useClass: PaymentRepository },
];

@Module({
  imports: [CqrsModule],
  controllers: [...httpControllers],
  providers: [...handlers, ...repositories, ...services],
})
export class PaymentModule {}
