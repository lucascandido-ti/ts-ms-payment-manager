export enum PaymentStatus {
  PENDING = 'Pending',
  EXPIRED = 'Expired',
  CONCLUDED = 'Concluded',
}

export const paymentStatusDict = {
  [PaymentStatus.PENDING]: 'Pendente',
  [PaymentStatus.EXPIRED]: 'Expirado',
  [PaymentStatus.CONCLUDED]: 'Concluido',
};
