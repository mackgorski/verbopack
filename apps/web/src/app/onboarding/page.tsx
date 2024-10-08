'use client'

import React from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { Button } from '@nextui-org/react';
import AccountTypeSelection, { AccountType, AccountTypeSchema } from './AccountTypeSelection';
import BasicInfoForm from './BasicInfoForm';
import AdditionalInfoForm, { AdditionalInfo, AdditionalInfoSchema } from './AdditionalInfoForm';
import UserPreferences, { UserPreferences as UserPreferencesType, UserPreferencesSchema } from './UserPreferences';
import PlanSelection, { Plan, PlanSchema } from './PlanSelection';
import PaymentSetup, { PaymentInfo, PaymentDataSchema } from './PaymentSetup';

const OnboardingPage: React.FC = () => {
  const { user } = useUser();
  const router = useRouter();
  const [step, setStep] = React.useState(0);
  const [accountType, setAccountType] = React.useState<AccountType>('individual');
  const [error, setError] = React.useState<string | null>(null);

  const handleAccountTypeSelection = (type: AccountType) => {
    try {
      AccountTypeSchema.parse(type);
      setAccountType(type);
      setStep(prevStep => prevStep + 1);
    } catch (error) {
      setError('Invalid account type selected');
    }
  };

  const handleBasicInfoSubmit = () => {
    setStep(prevStep => prevStep + 1);
  };

  const handleAdditionalInfoSubmit = (data: AdditionalInfo) => {
    try {
      AdditionalInfoSchema.parse(data);
      setStep(prevStep => prevStep + 1);
    } catch (error) {
      setError('Invalid additional info provided');
    }
  };

  const handleUserPreferencesSubmit = (data: UserPreferencesType) => {
    try {
      UserPreferencesSchema.parse(data);
      setStep(prevStep => prevStep + 1);
    } catch (error) {
      setError('Invalid user preferences provided');
    }
  };

  const handlePlanSelection = (plan: Plan) => {
    try {
      PlanSchema.parse(plan);
      setStep(prevStep => prevStep + 1);
    } catch (error) {
      setError('Invalid plan selected');
    }
  };

  const completeOnboarding = async (paymentData: PaymentInfo) => {
    try {
      PaymentDataSchema.parse(paymentData);
      if (user) {
        await user.update({
          unsafeMetadata: { ...user.unsafeMetadata, onboardingComplete: true, accountType },
        });
      }
      router.push('/dashboard');
    } catch (error) {
      console.error('Error updating user metadata:', error);
      setError('An error occurred during onboarding. Please try again.');
    }
  };

  const handleNextStep = () => {
    if (step < steps.length - 1) {
      setStep(prevStep => prevStep + 1);
    }
  };

  const steps = [
    { title: 'Select Account Type', component: <AccountTypeSelection onSelect={handleAccountTypeSelection} /> },
    { title: 'Basic Info', component: <BasicInfoForm onSubmit={handleBasicInfoSubmit} /> },
    { title: 'Additional Info', component: <AdditionalInfoForm accountType={accountType} onSubmit={handleAdditionalInfoSubmit} /> },
    { title: 'User Preferences', component: <UserPreferences onSubmit={handleUserPreferencesSubmit} /> },
    { title: 'Select Plan', component: <PlanSelection onSelect={handlePlanSelection} /> },
    { title: 'Payment Setup', component: <PaymentSetup onSubmit={completeOnboarding} /> },
  ];

  return (
    <div className="container mx-auto px-4 py-8" role="main">
      <h1 className="text-3xl font-bold mb-4">Welcome to Our Platform</h1>
      <div className="mb-8">
        <p aria-live="polite">Step {step + 1} of {steps.length}: {steps[step].title}</p>
      </div>
      {steps[step].component}
      {error && (
        <div className="mt-4 text-red-500" role="alert">
          {error}
        </div>
      )}
      <div className="mt-8">
        {step > 0 && (
          <Button
            onClick={() => {
              setStep(prevStep => prevStep - 1);
            }}
            className="mr-4"
            aria-label="Go to previous step"
          >
            Back
          </Button>
        )}
        {step < steps.length - 1 && (
          <Button onClick={handleNextStep} aria-label="Go to next step">Next</Button>
        )}
      </div>
    </div>
  );
};

export default OnboardingPage;
