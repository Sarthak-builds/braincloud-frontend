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
const { register, login, isAuthenticated} = useAuthStore();


    //form
    const form = useForm<FormData>({
        defaultValues: {
            username: '',
            password: '',
            ...(type==='signup' && {email: ''}),
        },
    });
    
    // onSubmit
    const handleSubmit = async (data: FormData) => {
     if (type === 'signup' && data.username) {
        await register({ email: data.email, password: data.password, username: data.username });
      } else {
        await login({ username: data.username, password: data.password });
      }
     const updatedState = useAuthStore.getState();
      console.log('isAuthenticated after submit (from store):', updatedState.isAuthenticated); // Debug state
      if (updatedState.isAuthenticated) {
        onSubmit(data); // Trigger parent callback for redirect
      }
    };
    
    return (<div className="flex justify-center w-4xl items-center rounded-2xl font-gothic overflow-x-hidden bg-linear-to-b from-cyan-500/30 via-blue-500/10 to-transparent px-4 scale-105">
        
        <Card className="bg-transparent border-none  text-white font-gothic rounded-r-none  w-4xl ">
            <CardHeader className="gap-0">
                <CardTitle className="text-3xl font-extralight">{type==='signup'? 'Create your Account': 'Welcome Back!'}</CardTitle>
                {type==='signup'?<p className="text-white/50 text-md"> Build your Second Brain now!</p>: <p className="text-white/50 text-md">Let's get back to your Second Brain</p>}
            </CardHeader>
            <CardContent className="">
                <form onSubmit={form.handleSubmit(handleSubmit)} className="flex items-center flex-col gap-4  w-full min-w-fit">
                 <Input className="py-1 border-0 bg-white/10 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="Username" type="text" {...form.register('username', {required:true})}></Input>
                 {type==='signup' &&<Input className="py-1 border-0 bg-white/10 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="Email" type="email" {...form.register('email',{required:true})}></Input>}
                 <Input className="py-1 border-0 bg-white/10 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="Password" type="password" {...form.register('password', {required:true})}></Input>
            <Button className="bg-cyan-500 mt-4 text-white w-40 hover:bg-cyan-600" type="submit" >{type==='signup' ? 'Sign Up': 'Sign In'}</Button>
            <div className="flex relative -top-2">
                {type==='signup'? <p>Already have an Account? </p>:<p>New to BrainCloud? </p>}
                {type==='signup'? <Link href='/signin' className="px-1 text-cyan-400 cursor-pointer">Log in</Link>: <Link href='/signup' className="px-1 text-cyan-400 cursor-pointer">Register</Link>}
            </div>
                </form>
            </CardContent>
        </Card>
        <div className="w-full px-8   pointer-events-none">
             
            <Image src="/assets/Images/braincd.png" alt="braincloudimage" width={500} height={500} className="z-0 relative"></Image>
            <p className="text-white/30 text-sm text-center">
Where ideas connect, grow, and think with you.</p>
       </div>
        </div>
    );
}
