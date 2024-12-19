import { NextResponse } from 'next/server';

export async function GET() {
  const response = NextResponse.json({ message: 'Token cleared' });
  console.log('token clear');
  response.cookies.set('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    expires: new Date(0), // Expire immediately
  });
  return response;
}
