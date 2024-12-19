import React from 'react';
import UpdateProfileForm from '@/components/UpdateProfileForm';
import { Box, Container } from '@mui/material';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Home() {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    redirect('/login');
  }

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100dvh',
        }}
      >
        <UpdateProfileForm/>
      </Box>
    </Container>
  );
}
