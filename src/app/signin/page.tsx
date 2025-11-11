// app/signin/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { AuthForm } from '@/components/UI/auth-form';

export default function SignInPage() {
  const router = useRouter();

  const handleSubmit = () => {
    console.log('Redirecting to dashboard');
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <AuthForm type="signin" onSubmit={handleSubmit} />
    </div>
  );
}