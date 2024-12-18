import { useAppSelector } from '@/store';
import React from 'react'

const UpdateButton = () => {
  const progressState = useAppSelector((state) => state.progress.progressState);

  return (
    <p>{ progressState }</p>
  )
}

export default UpdateButton