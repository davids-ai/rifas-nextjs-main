'use client';

import Link from 'next/link';
import { CheckCircleIcon } from 'lucide-react';

export default function VerifiedPage() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-50 to-white text-center px-6">
      <CheckCircleIcon className="text-green-500 w-20 h-20 mb-6" />
      <h1 className="text-3xl font-bold text-green-700 mb-4">¡Cuenta verificada con éxito!</h1>
      <p className="text-gray-600 max-w-md mb-8">
        Tu correo ha sido confirmado correctamente. Ya puedes iniciar sesión y disfrutar de todas las funciones de{' '}
        <strong>RIFAS</strong>.
      </p>
      <Link
        href="/login"
        className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-all"
      >
        Iniciar sesión
      </Link>
    </section>
  );
}
