import { Response } from '@/core/domain/utils/response';
import { PaymentDto } from '../dto';

export class PaymentResponse extends Response {
  public Data: PaymentDto;

  constructor(Data: PaymentDto) {
    super();
    this.Data = Data;
  }
}
