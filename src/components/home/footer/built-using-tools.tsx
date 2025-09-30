import Image from 'next/image';

export function BuiltUsingTools() {
  return (
    <footer className="bg-[#007DFA] text-white px-8 py-16">
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* DATOS PERSONALES */}
        <div className="mb-8 md:mb-0">
          <h4 className="font-semibold text-lg mb-4">DATOS PERSONALES</h4>
          <p className="text-sm leading-relaxed">
            Información breve acerca de su Marca, Organización, Persona o Empresa.
          </p>
        </div>

        {/* SECCIONES */}
        <div className="mb-8 md:mb-0">
          <h4 className="font-semibold text-lg mb-4">SECCIONES</h4>
          <ul className="text-sm space-y-2">
            <li>Inicio</li>
            <li>Lista de Boletos</li>
            <li>Verificar mis Boletos</li>
            <li>Preguntas Frecuentes</li>
          </ul>
        </div>

        {/* CONTACTO */}
        <div className="mb-8 md:mb-0">
          <h4 className="font-semibold text-lg mb-4">CONTACTO</h4>
          <ul className="text-sm space-y-2">
            <li>ruizeventos.com</li>
            <li>Colombia</li>
            <li>+57 3052070067</li>
          </ul>
        </div>

        {/* SÍGUENOS */}
        <div className="mb-8 md:mb-0">
          <h4 className="font-semibold text-lg mb-4">SÍGUENOS</h4>
          <div className="flex space-x-4 items-center">
            <a
              href="https://www.instagram.com/eventosdelruiz?igsh=MTRxbWhibHljeTFwbg=="
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src="/assets/icons/logo/instagram.svg" alt="Instagram" width={24} height={24} />
            </a>
            <a href="https://www.facebook.com/share/19h3pkgZf8/" target="_blank" rel="noopener noreferrer">
              <Image src="/assets/icons/logo/facebook.svg" alt="Facebook" width={24} height={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
