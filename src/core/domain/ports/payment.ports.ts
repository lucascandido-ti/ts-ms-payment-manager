import { Payment } from '@prisma/client';
import { IPayment } from '../interfaces';

export interface IPaymentRepository {
  GetByOrder(orderId: string): Promise<Payment>;
  GetByCustomer(customerId: number): Promise<IPayment>;
}
