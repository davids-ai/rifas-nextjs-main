import Image from 'next/image';
import Link from 'next/link';

export function PoweredByPaddle() {
  return (
    <footer className="bg-[#007DFA] text-white text-sm py-8 px-4">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center space-y-4">
        {/* Logos */}
        <div className="flex items-center space-x-4">
          <Image src="/assets/icons/logo-white.svg" alt="Logo Rifas" width={120} height={32} />
        </div>

        {/* Enlaces de términos */}
        <div className="flex flex-wrap gap-4 justify-center text-white">
          <Link href="/condiciones" className="hover:underline">
            Condiciones
          </Link>
          <span className="hidden md:inline">|</span>
          <Link href="/privacidad" className="hover:underline">
            Privacidad
          </Link>
          <span className="hidden md:inline">|</span>
          <Link href="/responsabilidad" className="hover:underline">
            Responsabilidad
          </Link>
        </div>

        {/* Derechos */}
        <div className="text-white">
          © 2025. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
