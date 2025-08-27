'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';

export default function ResetPasswordForm() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');
    if (!password || !confirmPassword) {
      setError('Por favor ingresa y confirma tu nueva contraseña.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }
    setLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({ password });
      if (error) {
        setError('Hubo un error al actualizar la contraseña. Intenta de nuevo.');
      } else {
        setMessage('¡Contraseña actualizada correctamente! Ya puedes iniciar sesión.');
      }
    } catch {
      setError('Hubo un error inesperado.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen h-screen w-screen bg-[#1570EF] flex items-center justify-center overflow-hidden relative">
      <div className="absolute top-8 left-8">
        <Link href="/">
          <Image src="/assets/icons/logo-white.svg" alt="AeroEdit" width={80} height={80} className="cursor-pointer" />
        </Link>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg px-8 py-10 flex flex-col items-center justify-center w-full max-w-md shadow-lg"
      >
        <div className="text-[24px] font-semibold text-center text-gray-800 mb-6">Restablecer contraseña</div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Nueva contraseña"
          className="w-full border border-[#D0D5DD] rounded-lg px-5 py-4 mb-4 text-[16px]"
          required
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirmar nueva contraseña"
          className="w-full border border-[#D0D5DD] rounded-lg px-5 py-4 mb-4 text-[16px]"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 bg-[#1570EF] text-white font-semibold rounded-lg py-3"
        >
          {loading ? 'Actualizando...' : 'Restablecer contraseña'}
        </button>
        {message && <p className="mt-2 text-sm text-center text-green-600">{message}</p>}
        {error && <p className="mt-2 text-sm text-center text-red-600">{error}</p>}
        <div className="text-center text-gray-800 text-sm mt-6">
          <Link href="/login" className="underline text-[#007dfa] hover:text-blue-700">
            Volver a iniciar sesión
          </Link>
        </div>
      </form>
    </div>
  );
}
