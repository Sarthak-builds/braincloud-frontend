// app/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/store/authStore';
import { Button } from '../components/UI/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/UI/card';

export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-2xl">Welcome to BrainCloud</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Your second brain app to organize your thoughts.</p>
          <Button onClick={() => router.push('/signin')} className="w-full">
            Get Started
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}