import React from 'react';
import LoginForm from '@/components/LoginForm';
import { Box } from '@mui/material';
import Image from 'next/image';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function generateMetadata() {
  const cookieStore = cookies();
  const token = cookieStore.get('token');

  if (token) {
    redirect('/');
  }
}

const LoginPage = () => {
  return (
    <Box sx={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div className='h-full w-1/2 flex justify-center items-center max-md:hidden'>
        <Image 
          src="https://media.licdn.com/dms/image/v2/D560BAQGPDZBBi8_ShA/company-logo_200_200/company-logo_200_200/0/1710984320554/rentbabe_logo?e=2147483647&v=beta&t=_UqRBBwBc_6gFczAtz-FutOlEpdbMlUVa0NSeGlqly4"
          width={300}
          height={300}
          alt='ebuddy-logo' 
        />
      </div>
      <div className='h-full w-1/2 flex flex-col justify-center items-center max-md:w-full border-l border-gray-100 bg-yellow-50'>
        <LoginForm />
      </div>
    </Box>
  );
};

export default LoginPage;
