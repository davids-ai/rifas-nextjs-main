"use client";

import Link from "next/link";

export default function EmailVerifiedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="bg-green-100 border border-green-400 text-green-700 px-8 py-6 rounded shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4">¡Cuenta verificada correctamente!</h1>
        <p className="mb-6">Tu correo ha sido verificado. Ahora puedes acceder al panel de rifas.</p>
        <Link href="/dashboard/rifas">
          <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded transition-colors">
            Ir al panel de rifas
          </button>
        </Link>
      </div>
    </div>
  );
}
