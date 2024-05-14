import { CreatePaymentRequest } from '../requests';

export class CreatePaymentCommand {
  constructor(public readonly request: CreatePaymentRequest) {}
}
