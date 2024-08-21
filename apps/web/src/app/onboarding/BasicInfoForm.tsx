import React from 'react';
import { Input, Button } from '@nextui-org/react';
import { z } from 'zod';

export const BasicInfoSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  // Add more fields as needed
});
export type BasicInfo = z.infer<typeof BasicInfoSchema>;

interface BasicInfoFormProps {
  onSubmit: (info: BasicInfo) => void;
}

const BasicInfoForm: React.FC<BasicInfoFormProps> = ({ onSubmit }) => {
  const [info, setInfo] = React.useState<BasicInfo>({
    firstName: '',
    lastName: '',
    email: '',
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
      <h2 className="text-2xl font-bold mb-4">Basic Information</h2>
      <div className="space-y-4">
        <Input
          name="firstName"
          value={info.firstName}
          onChange={handleChange}
          placeholder="First Name"
          required
        />
        <Input
          name="lastName"
          value={info.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          required
        />
        <Input
          name="email"
          type="email"
          value={info.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
      </div>
      <Button type="submit" className="mt-4">Next</Button>
    </form>
  );
};

export default BasicInfoForm;