import { Injectable } from '@nestjs/common';
import { Payment } from '@prisma/client';

import { PrismaService } from '@/config';
import { IPayment } from '@/core/domain/interfaces';
import { IPaymentRepository } from '@/core/domain/ports';

@Injectable()
export class PaymentRepository implements IPaymentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async GetByOrder(orderId: string): Promise<Payment> {
    return this.prisma.payment.findUniqueOrThrow({ where: { id: orderId } });
  }
  GetByCustomer(_: number): Promise<IPayment> {
    throw new Error('Method not implemented.');
  }
}
