import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { PaymentMethod, PaymentStatus } from '../../../domain/payment/enums';
import { Payment } from '@prisma/client';

export class PaymentDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsEnum(PaymentMethod)
  @IsNotEmpty()
  paymentMethod: PaymentMethod;

  @IsEnum(PaymentStatus)
  @IsNotEmpty()
  paymentStatus: PaymentStatus;

  @IsNumber()
  @IsNotEmpty()
  orderId: number;

  @IsNumber()
  @IsNotEmpty()
  customerId: number;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  public MapToModel(dto: PaymentDto): Payment {
    const { id, paymentMethod, paymentStatus, orderId, customerId, price } =
      dto;
    return {
      id,
      paymentMethod,
      paymentStatus,
      orderId,
      customerId,
      price,
    } as Payment;
  }

  public MapToDTO(model: Payment): PaymentDto {
    const { id, paymentMethod, paymentStatus, orderId, customerId, price } =
      model;
    return {
      id,
      paymentMethod,
      paymentStatus,
      orderId,
      customerId,
      price,
    } as PaymentDto;
  }
}
