import * as mongoose from 'mongoose';

export const PaymentSchema = new mongoose.Schema({
  paymentMethod: String,
  paymentStatus: String,
  orderId: Number,
  customerId: Number,
  createdAt: Date,
  updatedAt: Date,
});
