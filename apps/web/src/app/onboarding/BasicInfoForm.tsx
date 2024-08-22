import React, { useState } from 'react';
import { Input, Button } from '@nextui-org/react';
import { z } from 'zod';

const BasicInfoSchema = z.object({
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
});

export type BasicInfo = z.infer<typeof BasicInfoSchema>;

interface BasicInfoFormProps {
  onSubmit: (data: BasicInfo) => void;
}

const BasicInfoForm: React.FC<BasicInfoFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<BasicInfo>({
    email: '',
    firstName: '',
    lastName: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validatedData = BasicInfoSchema.parse(formData);
    onSubmit(validatedData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        name="email"
        label="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <Input
        name="firstName"
        label="First Name"
        value={formData.firstName}
        onChange={handleChange}
        required
      />
      <Input
        name="lastName"
        label="Last Name"
        value={formData.lastName}
        onChange={handleChange}
        required
      />
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default BasicInfoForm;