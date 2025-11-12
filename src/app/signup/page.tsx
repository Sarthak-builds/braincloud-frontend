'use client';

import { useRouter } from "next/navigation";
import { AuthForm } from "@/components/UI/auth-form";

export default function SignUpPage() {
    const router = useRouter();
   const handleSubmit = () => {
    router.push('/dashboard');
   };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <AuthForm type="signup" onSubmit={handleSubmit} />
    </div>
  );
}