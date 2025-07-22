import Image from "next/image";

export function AboutUsSection() {
  return (
    <section className="relative bg-background py-20 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto overflow-hidden">
      {/* Imagen efecto atravesando columnas */}
      <Image
        src="/assets/images/efecto.png"
        alt="Efecto visual"
        width={800}
        height={800}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-40 z-0 pointer-events-none"
      />

      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 items-center z-10">
        {/* Columna izquierda */}
        <div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Acerca de nosotros</h2>
          <p className="text-muted-foreground text-lg leading-7">
            Somos una plataforma dedicada a ofrecer rifas 100% legales, seguras y emocionantes. Nuestro objetivo es brindarte
            la oportunidad de ganar premios increíbles de manera justa y transparente. ¡Conéctate, elige tus boletos y gana!
          </p>
        </div>

        {/* Columna derecha con imágenes */}
        <div className="relative w-full h-[500px] md:h-[600px]">
          {/* Teléfono 2D más grande */}
          <Image
            src="/assets/images/phone.png"
            alt="Teléfono 2D"
            width={280}
            height={550}
            className="absolute bottom-12 left-1/4 z-10 transform rotate-[-10deg]"
          />

          {/* Teléfono 3D en esquina inferior derecha */}
          <Image
            src="/assets/images/phone1.png"
            alt="Teléfono 3D"
            width={320}
            height={600}
            className="absolute bottom-0 right-0 z-20 transform rotate-[5deg]"
          />
        </div>
      </div>
    </section>
  );
}
