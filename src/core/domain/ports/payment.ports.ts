import { IPayment } from '../interfaces';

export interface IPaymentRepository {
  GetByOrder(orderId: number): Promise<IPayment>;
  GetByCustomer(customerId: number): Promise<IPayment>;
}
