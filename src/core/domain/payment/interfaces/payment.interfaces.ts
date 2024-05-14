import { Document } from 'mongoose';
import { PaymentMethod, PaymentStatus } from '../enums';

export interface IPayment extends Document {
  readonly orderId: number;
  readonly customerId: number;
  readonly paymentMethod: PaymentMethod;
  readonly paymentStatus: PaymentStatus;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
