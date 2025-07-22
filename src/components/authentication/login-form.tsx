'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { login } from '@/app/login/actions';
import { useState } from 'react';
import { AuthenticationForm } from '@/components/authentication/authentication-form';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';

export function LoginForm() {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleLogin() {
    login({ email, password }).then((data) => {
      if (data?.error) {
        toast({ description: 'Correo o contraseña inválidos', variant: 'destructive' });
      }
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-600">
      <form
        action={'#'}
        className="bg-white rounded-lg px-6 md:px-16 pb-6 py-8 gap-6 flex flex-col items-center justify-center w-full max-w-md shadow-lg"
      >
        <Image
          src="/assets/icons/logo.svg"
          alt="Logo"
          width={80}
          height={80}
        />
        <div className="text-[24px] leading-[30px] font-semibold text-center text-gray-800">
          Inicia sesión en tu cuenta
        </div>

        <div className="flex w-full items-center justify-center">
          <Separator className="w-5/12 bg-gray-300" />
          <div className="text-gray-500 text-xs font-medium px-4">o</div>
          <Separator className="w-5/12 bg-gray-300" />
        </div>

        <AuthenticationForm
          email={email}
          onEmailChange={(email) => setEmail(email)}
          password={password}
          onPasswordChange={(password) => setPassword(password)}
        />

        <Button
          formAction={() => handleLogin()}
          type="submit"
          variant="secondary"
          className="w-full mt-4"
        >
          Iniciar sesión
        </Button>
      </form>
    </div>
  );
}
