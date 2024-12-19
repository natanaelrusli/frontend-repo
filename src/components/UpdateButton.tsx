"use client";

import { useAppSelector } from '@/store';
import { Button, ButtonProps } from '@mui/material';
import React from 'react';

const UpdateButton: React.FC<ButtonProps> = (props) => {
  const progressState = useAppSelector((state) => state.progress.progressState);

  return (
    <Button
      variant="outlined"
      disabled={progressState === 'loading'}
      fullWidth
      {...props}
    >
      { progressState === 'loading' ? 'Loading ...' : 'Update Profile' }
    </Button>
  );
};

export default UpdateButton;
