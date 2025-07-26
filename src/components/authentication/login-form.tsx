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

  function handleLogin() {
    login({ email, password }).then((data) => {
      if (data?.error) {
        toast({ description: 'Correo o contraseña inválidos', variant: 'destructive' });
      }
    });
  }

  return (
    <div
      className="min-h-screen h-screen w-screen bg-[#1570EF] flex items-center justify-center overflow-hidden relative"
      style={{ minHeight: '100vh', height: '100vh', width: '100vw' }}
    >
      {/* Logo arriba a la izquierda */}
      <div className="absolute top-8 left-8">
        <Link href="/">
          <Image src="/assets/icons/logo-white.svg" alt="AeroEdit" width={80} height={80} className="cursor-pointer" />
        </Link>
      </div>
      {/* Formulario centrado */}
      <form
        action="#"
        className="bg-white rounded-lg px-8 py-10 flex flex-col items-center justify-center w-full max-w-md shadow-lg"
        style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <div className="text-[24px] leading-[30px] font-semibold text-center text-gray-800 mb-6">
          Inicia sesión en tu cuenta
        </div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo electrónico"
          className="w-full border border-[#D0D5DD] rounded-lg px-5 py-4 mb-4 text-[16px] text-gray-800 placeholder-[#98A2B3] focus:outline-none"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          className="w-full border border-[#D0D5DD] rounded-lg px-5 py-4 mb-4 text-[16px] text-gray-800 placeholder-[#98A2B3] focus:outline-none"
        />
        <Button
          type="submit"
          variant="secondary"
          className="w-full mt-2 bg-[#1570EF] text-white font-semibold rounded-lg py-3 hover:bg-[#1570EF] text-[16px]"
          style={{ backgroundColor: '#1570EF', color: '#fff', borderRadius: '8px', fontWeight: 600, fontSize: '16px' }}
        >
          Iniciar sesión
        </Button>
        <div className="text-center text-gray-800 text-sm mt-6 font-medium text-[16px]">
          ¿No tienes una cuenta?{' '}
          <a href="/signup" className="underline text-[#007dfa] hover:text-blue-700 transition">
            Regístrate
          </a>
        </div>
      </form>
    </div>
  );
}
