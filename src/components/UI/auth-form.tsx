'use client';

import { useState } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import useAuthStore from "@/store/authStore";
import { useForm} from 'react-hook-form';
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import {motion} from 'framer-motion';

interface AuthFormProps {
    type: 'signup' | 'signin' ;
    onSubmit: (data: FormData) => void;
}
interface FormData {
    email: string;
    password: string;
    username?: string;
}

export function AuthForm({type, onSubmit}: AuthFormProps) {
const { register, login} = useAuthStore();
    const form = useForm<FormData>({
        defaultValues: {
            username: '',
            password: '',
            ...(type==='signup' && {email: ''}),
        },
    });
    const handleSubmit = async (data: FormData) => {
     if (type === 'signup' && data.username) {
        await register({ email: data.email, password: data.password, username: data.username });
      } else {
        await login({ username: data.username, password: data.password });
      }
     const updatedState = useAuthStore.getState();
        if (updatedState.isAuthenticated) {
            onSubmit(data);
        }
    };
    
    return (<motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col md:flex-row w-full max-w-4xl items-center rounded-3xl overflow-hidden glass-panel p-2"
        >
            {/* Form Section */}
            <div className="flex-1 p-8 md:p-12 w-full">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-white to-white/60 mb-2">
                        {type === 'signup' ? 'Create Account' : 'Welcome Back'}
                    </h2>
                    <p className="text-white/40">
                        {type === 'signup' ? 'Start building your second brain.' : 'Access your knowledge base.'}
                    </p>
                </div>

                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                    <Input 
                        className="glass-input h-12" 
                        placeholder="Username" 
                        {...form.register('username', { required: true })} 
                    />
                    
                    {type === 'signup' && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}>
                            <Input 
                                className="glass-input h-12" 
                                placeholder="Email" 
                                type="email" 
                                {...form.register('email', { required: true })} 
                            />
                        </motion.div>
                    )}
                    <Input className="glass-input h-12" placeholder="Password" type="password" 
                        {...form.register('password', { required: true })} />

                    <Button 
                        className="w-full h-12 bg-linear-to-r from-yellow-600 to-yellow-600 hover:from-yellow-500 hover:to-yellow-500 text-white font-medium rounded-xl shadow-lg shadow-yellow-900/20 mt-6" 
                        type="submit"
                    >
                        {type === 'signup' ? 'Sign Up' : 'Sign In'}
                    </Button>
                </form>

                <div className="mt-6 text-center text-sm text-white/40">
                    {type === 'signup' ? 'Already have an account?' : "Don't have an account?"}
                    <Link 
                        href={type === 'signup' ? '/signin' : '/signup'} 
                        className="ml-2 text-yellow-400 hover:text-yellow-300 font-medium transition-colors"
                    >
                        {type === 'signup' ? 'Log in' : 'Register'}
                    </Link>
                </div>
            </div>

            <div className="hidden md:flex flex-1 flex-col items-center justify-center p-8 bg-white/5 rounded-2xl h-full min-h-[500px] relative overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-yellow-500/10 to-transparent" />
                <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    className="relative z-10"
                >
                    <Image 
                        src="/assets/Images/braincd.png" 
                        alt="braincloud" 
                        width={400} 
                        height={400} 
                        className="object-contain drop-shadow-2xl"
                    />
                </motion.div>
                <p className="mt-8 text-center text-white/50 max-w-xs relative z-10 font-light">
                    "Where ideas connect, grow, and think with you."
                </p>
            </div>
        </motion.div>
    );
}
