
import Link from "next/link";

export default function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="bg-red-100 border border-red-400 text-red-700 px-8 py-6 rounded shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4">Enlace inválido o expirado</h1>
        <p className="mb-6">El enlace de verificación de correo es inválido o ha expirado. Por favor solicita un nuevo enlace o intenta registrarte nuevamente.</p>
        <Link href="/signup">
          <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded transition-colors">
            Ir a registro
          </button>
        </Link>
      </div>
    </div>
  );
}
