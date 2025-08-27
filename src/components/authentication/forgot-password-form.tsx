'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useForgotPassword } from '@/hooks/useForgotPassword';

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const { sendResetEmail, loading, message, error } = useForgotPassword();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    sendResetEmail(email);
  };

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
        onSubmit={handleSubmit}
        className="bg-white rounded-lg px-8 py-10 flex flex-col items-center justify-center w-full max-w-md shadow-lg"
      >
        <div className="text-[24px] font-semibold text-center text-gray-800 mb-6">Recuperar contraseña</div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo electrónico"
          className="w-full border border-[#D0D5DD] rounded-lg px-5 py-4 mb-4 text-[16px]"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 bg-[#1570EF] text-white font-semibold rounded-lg py-3"
        >
          {loading ? 'Enviando...' : 'Enviar instrucciones'}
        </button>
        {message && <p className="mt-2 text-sm text-center text-green-600">{message}</p>}
        {error && <p className="mt-2 text-sm text-center text-red-600">{error}</p>}
        <div className="text-center text-gray-800 text-sm mt-6">
          <Link href="/login" className="underline text-[#007dfa] hover:text-blue-700">
            Volver a iniciar sesión
          </Link>
        </div>
        {message && <p className="mt-2 text-sm text-center">{message}</p>}
      </form>
    </div>
  );
}
