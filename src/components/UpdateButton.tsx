"use client"

import { useAppSelector } from '@/store';
import { setAuthState } from '@/store/actions';
import { Button } from '@mui/material';
import React from 'react'
import { useDispatch } from 'react-redux';

const UpdateButton = () => {
  const dispatch = useDispatch();
  const progressState = useAppSelector((state) => state.progress.progressState);

  return (
    <Button variant='outlined' onClick={() => dispatch(setAuthState('success'))} fullWidth>{ progressState || 'Update Profile' }</Button>
  )
}

export default UpdateButton