import { Payment } from '@prisma/client';
import { Injectable, Logger } from '@nestjs/common';

import { PrismaService } from '@/config';

import { Order } from '@/core/domain/order/entity';
import {
  PaymentStatus,
  PaymentMethod as PaymentMethodEnum,
  PaymentMethodIdx,
} from '@/core/domain/payment/enums';
import { IPaymentRepository } from '@/core/domain/payment/ports';

@Injectable()
export class PaymentRepository implements IPaymentRepository {
  private readonly logger = new Logger(PaymentRepository.name);

  constructor(private readonly prisma: PrismaService) {}

  ProcessPayment(_: Payment): Promise<Payment> {
    throw new Error('Method not implemented.');
  }

  async CreatePayment(order: Order): Promise<Payment> {
    const { Id, Customer, PaymentMethod, Price } = order;
    const payload = {
      customerId: Customer.Id,
      orderId: Id,
      paymentMethod: PaymentMethodEnum[PaymentMethodIdx[PaymentMethod]],
      paymentStatus: PaymentStatus.PENDING,
      price: Price,
    } as Payment;

    this.logger.debug(`CreatePayment: payload: `, payload);

    const payment = await this.prisma.payment.create({ data: payload });

    this.logger.debug(`CreatePayment: result: `, payment);

    return payment;
  }

  async GetByOrder(orderId: string): Promise<Payment> {
    return this.prisma.payment.findUnique({ where: { id: orderId } });
  }
}
