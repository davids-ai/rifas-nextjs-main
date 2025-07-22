'use client';

import { useRouter } from 'next/navigation';

export function HeroSection() {
  const router = useRouter();

  return (
    <section className="mx-auto max-w-7xl px-[32px] relative flex items-center justify-between mt-16 mb-12">
      <div className="text-center w-full">
        <h1 className="text-[48px] leading-[48px] md:text-[72px] md:leading-[80px] tracking-[-1.2px] font-semibold">
          Participa. Gana. ¡Es tu momento!
        </h1>
        <p className="mt-6 text-[18px] leading-[27px] md:text-[20px] md:leading-[30px] text-muted-foreground">
          Rifas seguras y legales. ¡Elige tu boleto y haz parte de los ganadores!
        </p>

        {/* Botón */}
        <div className="mt-8">
          <button
            onClick={() => router.push('/signup')}
            className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium py-3 px-6 rounded-full shadow-md transition duration-300 cursor-pointer"
          >
            Comprar boletos ahora
          </button>
        </div>
      </div>
    </section>
  );
}
