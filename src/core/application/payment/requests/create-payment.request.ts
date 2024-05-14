import { Order } from '@/core/domain/order/entity';

export class CreatePaymentRequest {
  public order: Order;
}
