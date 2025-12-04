'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/store/authStore';
import { Button } from '@/components/UI/button';
import { motion } from 'framer-motion';
import { Brain, ArrowRight } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center font-gothic overflow-hidden relative">
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
        className="absolute -top-1/2 -left-1/2 w-full h-full bg-linear-to-br from-yellow-500/10 to-transparent rounded-full blur-3xl pointer-events-none"
      />

      <div className="text-center z-10 px-6 max-w-3xl mx-auto">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-6"
        >
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 shadow-2xl backdrop-blur-sm">
            <Brain className="w-16 h-16 text-yellow-400" />
          </div>
        </motion.div>

        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-linear-to-r from-white via-white to-white/50 mb-6 tracking-tight"
        >
          BrainCloud
        </motion.h1>

        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl text-white/60 mb-10 leading-relaxed"
        >
          Your digital second brain. Capture notes, tweets, videos, and documents in one seamless workspace designed for clarity.
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Button 
            onClick={() => router.push('/signin')} 
            className="h-14 px-8 text-lg rounded-full bg-linear-to-r from-yellow-600 to-yellow-600 hover:from-yellow-500 hover:to-yellow-500 text-white shadow-lg shadow-yellow-500/20 border border-white/10 group transition-all duration-300"
          >
            Get Started
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}