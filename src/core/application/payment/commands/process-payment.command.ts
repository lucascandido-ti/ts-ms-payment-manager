import { ProcessPaymentRequest } from '../requests';

export class ProcessPaymentCommand {
  constructor(public readonly request: ProcessPaymentRequest) {}
}
