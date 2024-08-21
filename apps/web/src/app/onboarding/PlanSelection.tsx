// File: apps/web/src/app/onboarding/PlanSelection.tsx

import React from 'react';
import { Button, Card } from '@nextui-org/react';
import { z } from 'zod';

export const PlanTier = {
  Basic: 'Basic',
  Pro: 'Pro',
  Enterprise: 'Enterprise'
} as const;

export type PlanTierType = typeof PlanTier[keyof typeof PlanTier];

export const PlanSchema = z.object({
  id: z.string().min(1, "Plan ID is required"),
  name: z.string().refine(
    (val): val is PlanTierType => Object.values(PlanTier).includes(val as PlanTierType),
    {
      message: "Invalid plan name. Must be 'Basic', 'Pro', or 'Enterprise'."
    }
  ),
  price: z.number().nonnegative("Price must be non-negative"),
  features: z.array(z.string().nonempty("Feature cannot be empty")),
});

export type Plan = z.infer<typeof PlanSchema>;

interface PlanSelectionProps {
  onSelect: (plan: Plan) => void;
}

// TODO: Change this to get the enum values from DB dynamically
const plans: Plan[] = [
  {
    id: 'basic',
    name: PlanTier.Basic,
    price: 9.99,
    features: ['Feature 1', 'Feature 2', 'Feature 3'],
  },
  {
    id: 'pro',
    name: PlanTier.Pro,
    price: 19.99,
    features: ['All Basic features', 'Feature 4', 'Feature 5'],
  },
  {
    id: 'enterprise',
    name: PlanTier.Enterprise,
    price: 49.99,
    features: ['All Pro features', 'Feature 6', 'Feature 7', 'Feature 8'],
  },
];

const PlanSelection: React.FC<PlanSelectionProps> = ({ onSelect }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Select a Plan</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map((plan) => (
          <Card key={plan.id} className="p-4">
            <h3 className="text-xl font-bold">{plan.name}</h3>
            <p className="text-2xl font-bold my-2">${plan.price}/month</p>
            <ul className="list-disc list-inside mb-4">
              {plan.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            <Button onClick={() => onSelect(plan)}>Select {plan.name}</Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PlanSelection;
