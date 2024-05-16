import { CqrsModule } from '@nestjs/cqrs';
import { Module, Provider } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import {
  PAYMENT_REPOSITORY,
  PAYMENT_SERVICE,
  PrismaService,
  QUEUE_REPOSITORY,
  rabbitmqModuleOptions,
} from '@/config';

import { PaymentRepository } from '@/adapters/data';
import { RabbitMQRepository } from '@/adapters/rabbitMQ';

import { PaymentController } from '@/consumers/controllers';

import {
  CreatePaymentCommandHandler,
  ProcessPaymentCommandHandler,
} from '@/core/application/payment/commands';
import { GetPaymentByOrderQueryHandler } from '@/core/application/payment/queries';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

const httpControllers = [PaymentController];
const handlers: Provider[] = [
  GetPaymentByOrderQueryHandler,
  CreatePaymentCommandHandler,
  ProcessPaymentCommandHandler,
];
const services: Provider[] = [PrismaService];
const repositories: Provider[] = [
  { provide: PAYMENT_REPOSITORY, useClass: PaymentRepository },
  { provide: QUEUE_REPOSITORY, useClass: RabbitMQRepository },
];

@Module({
  imports: [
    ClientsModule.register([
      {
        name: PAYMENT_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: ["amqp://guest:guest@localhost:5672"],
          queue: "payment-service-queue",
          queueOptions: {
            durable: true
          }
        }
      }
    ]),
    CqrsModule,
  ],
  controllers: [...httpControllers],
  providers: [...handlers, ...repositories, ...services],
})
export class PaymentModule {}
