import { Payment } from '@prisma/client';
import { Inject, Injectable, Logger } from '@nestjs/common';

import { PrismaService, QUEUE_REPOSITORY } from '@/config';

import { Order } from '@/core/domain/order/entity';
import {
  PaymentStatus,
  PaymentMethod as PaymentMethodEnum,
  PaymentMethodIdx,
} from '@/core/domain/payment/enums';
import { IPaymentRepository } from '@/core/domain/payment/ports';
import { PaymentDto } from '@/core/application/payment/dto';
import { IQueueRepository } from '@/core/domain/queue';

@Injectable()
export class PaymentRepository implements IPaymentRepository {
  private readonly logger = new Logger(PaymentRepository.name);

  constructor(
    private readonly prisma: PrismaService,
    @Inject(QUEUE_REPOSITORY)
    private readonly queueRepository: IQueueRepository,
  ) {}

  async ProcessPayment(dto: PaymentDto): Promise<Payment> {
    const payment = await this.prisma.payment.findUnique({
      where: { id: dto.id },
    });
    payment.paymentStatus = PaymentStatus.CONCLUDED;
    payment.updatedAt = new Date();

    const { id, ...paymentData } = payment;
    const result = await this.prisma.payment.update({
      data: {
        ...paymentData,
      },
      where: { id: id },
    });

    this.logger.debug(`ProcessPayment: result: `, result);

    this.queueRepository.publish(result, 'processed-payment');

    return result;
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
    return this.prisma.payment.findFirst({
      where: { orderId: Number(orderId) },
    });
  }
}
