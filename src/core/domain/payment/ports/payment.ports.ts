import { PaymentDto } from '@/core/application/payment/dto';
import { Order } from '@/core/domain/order';
import { Payment } from '@prisma/client';

export interface IPaymentRepository {
  GetByOrder(orderId: string): Promise<Payment>;
  CreatePayment(order: Order): Promise<Payment>;
  ProcessPayment(payment: PaymentDto): Promise<Payment>;
}
