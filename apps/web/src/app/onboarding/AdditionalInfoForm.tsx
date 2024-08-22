import React from 'react';
import { Input, Button } from '@nextui-org/react';
import { z } from 'zod';

export const AdditionalInfoSchema = z.object({
  jobTitle: z.string().min(1, "Job title is required"),
  industry: z.string().min(1, "Industry is required"),
  // Add more fields as needed
});
export type AdditionalInfo = z.infer<typeof AdditionalInfoSchema>;

interface AdditionalInfoFormProps {
  accountType: 'visitor' | 'individual' | 'business';
  onSubmit: (info: AdditionalInfo) => void;
}

const AdditionalInfoForm: React.FC<AdditionalInfoFormProps> = ({ accountType, onSubmit }) => {
  const [info, setInfo] = React.useState<AdditionalInfo>({
    jobTitle: '',
    industry: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(info);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-4">Additional Information</h2>
      <div className="space-y-4">
        {accountType === 'business' && (
          <Input
            name="jobTitle"
            value={info.jobTitle}
            onChange={handleChange}
            placeholder="Job Title"
            required
          />
        )}
        <Input
          name="industry"
          value={info.industry}
          onChange={handleChange}
          placeholder="Industry"
          required
        />
      </div>
      <Button type="submit" className="mt-4">Next</Button>
    </form>
  );
};

export default AdditionalInfoForm;