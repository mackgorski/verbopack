import React from 'react';
import { Input, Button } from '@nextui-org/react';
import { z } from 'zod';

export const PaymentDataSchema = z.object({
  cardNumber: z.string().regex(/^\d{16}$/, "Invalid card number"),
  expirationDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid expiry date"),
  cvv: z.string().regex(/^\d{3,4}$/, "Invalid CVV"),
  // Add more fields as needed
});
export type PaymentInfo = z.infer<typeof PaymentDataSchema>;

interface PaymentSetupProps {
  onSubmit: (paymentInfo: PaymentInfo) => void;
}

const PaymentSetup: React.FC<PaymentSetupProps> = ({ onSubmit }) => {
  const [paymentInfo, setPaymentInfo] = React.useState<PaymentInfo>({
    cardNumber: '',
    expirationDate: '',
    cvv: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(paymentInfo);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-4">Payment Setup</h2>
      <div className="space-y-4">
        <Input
          name="cardNumber"
          value={paymentInfo.cardNumber}
          onChange={handleChange}
          placeholder="Card Number"
          required
        />
        <Input
          name="expirationDate"
          value={paymentInfo.expirationDate}
          onChange={handleChange}
          placeholder="Expiration Date (MM/YY)"
          required
        />
        <Input
          name="cvv"
          value={paymentInfo.cvv}
          onChange={handleChange}
          placeholder="CVV"
          required
        />
      </div>
      <Button type="submit" className="mt-4">Complete Payment Setup</Button>
    </form>
  );
};

export default PaymentSetup;