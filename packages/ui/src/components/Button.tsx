import React from 'react';
import { Button as NextUIButton } from '@nextui-org/react';

export const CustomButton = (props: React.ComponentProps<typeof NextUIButton>) => {
    return <NextUIButton {...props} />;
};