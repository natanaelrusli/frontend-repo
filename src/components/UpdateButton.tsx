import { useAppSelector } from '@/store';
import { Button } from '@mui/material';
import React from 'react'

const UpdateButton = () => {
  const progressState = useAppSelector((state) => state.progress.progressState);

  return (
    <Button variant='outlined' fullWidth>{ progressState || 'Submit Data' }</Button>
  )
}

export default UpdateButton