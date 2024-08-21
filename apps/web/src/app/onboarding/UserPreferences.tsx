import React from 'react';
// import { Checkbox, Button } from '@repo/ui';
import { Checkbox, Button } from '@nextui-org/react';
import { z } from 'zod';

export const UserPreferencesSchema = z.object({
  receiveNewsletter: z.boolean(),
  receiveProductUpdates: z.boolean(),
  darkMode: z.boolean(),
  // Add more fields as needed
});
export type UserPreferences = z.infer<typeof UserPreferencesSchema>;

interface UserPreferencesProps {
  onSubmit: (preferences: UserPreferences) => void;
}

const UserPreferences: React.FC<UserPreferencesProps> = ({ onSubmit }) => {
  const [preferences, setPreferences] = React.useState<UserPreferences>({
    receiveNewsletter: false,
    receiveProductUpdates: false,
    darkMode: false,
  });

  const handleChange = (name: keyof UserPreferences) => {
    setPreferences((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(preferences);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-4">User Preferences</h2>
      <div className="space-y-4">
        <Checkbox
          isSelected={preferences.receiveNewsletter}
          onValueChange={() => handleChange('receiveNewsletter')}
          aria-label="Receive Newsletter"
        >Receive Newsletter
        </Checkbox>
        <Checkbox
          isSelected={preferences.receiveProductUpdates}
          onValueChange={() => handleChange('receiveProductUpdates')}
          aria-label="Receive Product Updates"
        >Receive Product Updates
        </Checkbox>
        <Checkbox
          isSelected={preferences.darkMode}
          onValueChange={() => handleChange('darkMode')}
          aria-label="Enable Dark Mode"
        >Enable Dark Mode
        </Checkbox>
      </div>
      <Button type="submit" className="mt-4">Next</Button>
    </form>
  );
};

export default UserPreferences;