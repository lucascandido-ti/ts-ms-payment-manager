import { IPayment } from '@/core/domain/interfaces';
import { IPaymentRepository } from '@/core/domain/ports/payment.ports';

export class PaymentRepository implements IPaymentRepository {
  GetByOrder(_: number): Promise<IPayment> {
    throw new Error('Method not implemented.');
  }
  GetByCustomer(_: number): Promise<IPayment> {
    throw new Error('Method not implemented.');
  }
}
