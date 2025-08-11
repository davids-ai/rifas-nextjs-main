'use client';

import { Button } from '@/components/ui/button';
import { login } from '@/app/login/actions';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useToast } from '@/components/ui/use-toast';

export function LoginForm() {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin() {
    const data = await login({ email, password });

    if (data?.error) {
      if (data.error === 'no_verified') {
        toast({
          description: 'Debes verificar tu cuenta. Revisa tu bandeja de entrada para confirmar tu correo.',
          variant: 'destructive',
        });
      } else if (data.error === 'invalid_credentials') {
        toast({
          description: 'Correo o contraseña inválidos',
          variant: 'destructive',
        });
      }
    }
  }

  return (
    <div className="min-h-screen h-screen w-screen bg-[#1570EF] flex items-center justify-center overflow-hidden relative">
      {/* Logo arriba a la izquierda */}
      <div className="absolute top-8 left-8">
        <Link href="/">
          <Image src="/assets/icons/logo-white.svg" alt="AeroEdit" width={80} height={80} className="cursor-pointer" />
        </Link>
      </div>

      {/* Formulario centrado */}
      <form
        className="bg-white rounded-lg px-8 py-10 flex flex-col items-center justify-center w-full max-w-md shadow-lg"
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <div className="text-[24px] font-semibold text-center text-gray-800 mb-6">Inicia sesión en tu cuenta</div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo electrónico"
          className="w-full border border-[#D0D5DD] rounded-lg px-5 py-4 mb-4 text-[16px]"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          className="w-full border border-[#D0D5DD] rounded-lg px-5 py-4 mb-4 text-[16px]"
        />
        <Button type="submit" className="w-full mt-2 bg-[#1570EF] text-white font-semibold rounded-lg py-3">
          Iniciar sesión
        </Button>
        <div className="text-center text-gray-800 text-sm mt-6">
          ¿No tienes una cuenta?{' '}
          <a href="/signup" className="underline text-[#007dfa] hover:text-blue-700">
            Regístrate
          </a>
        </div>
      </form>
    </div>
  );
}
