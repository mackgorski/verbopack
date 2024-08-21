import React from 'react';
import { Button } from '@nextui-org/react';
import { z } from 'zod';

export const AccountTypeSchema = z.enum(['visitor', 'individual', 'business']);
export type AccountType = z.infer<typeof AccountTypeSchema>;

interface AccountTypeSelectionProps {
  onSelect: (type: AccountType) => void;
}

const AccountTypeSelection: React.FC<AccountTypeSelectionProps> = ({ onSelect }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Select Account Type</h2>
      <div className="flex space-x-4">
        <Button onClick={() => onSelect('visitor')}>Visitor</Button>
        <Button onClick={() => onSelect('individual')}>Individual</Button>
        <Button onClick={() => onSelect('business')}>Business</Button>
      </div>
    </div>
  );
};

export default AccountTypeSelection;