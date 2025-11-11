'use client';

import { useState } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import useAuthStore from "@/store/authStore";
import { useForm} from 'react-hook-form';
import { useRouter } from "next/router";

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

    return (
        <Card>
            <CardHeader>
                <CardTitle>{type==='signup'? 'Sign Up': 'Sign In'}</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                 <Input placeholder="Username" type="text" {...form.register('username', {required:true})}></Input>
                 {type==='signup' &&<Input placeholder="Email" type="email" {...form.register('email',{required:true})}></Input>}
                 <Input placeholder="Password" type="password" {...form.register('password', {required:true})}></Input>
            <Button type="submit" disabled={isAuthenticated}>{type==='signup' ? 'Sign Up': 'Sign In'}</Button>
                </form>
            </CardContent>
        </Card>
    );
}
