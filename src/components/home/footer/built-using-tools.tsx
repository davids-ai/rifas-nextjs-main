import Image from 'next/image';

export function BuiltUsingTools() {
  return (
    <footer className="bg-[#007DFA] text-white px-8 py-16">
      <div className="mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
        {/* DATOS PERSONALES */}
        <div>
          <h4 className="font-semibold text-lg mb-4">DATOS PERSONALES</h4>
          <p className="text-sm leading-relaxed">
            Información breve acerca de su Marca, Organización, Persona o Empresa.
          </p>
        </div>

        {/* SECCIONES */}
        <div>
          <h4 className="font-semibold text-lg mb-4">SECCIONES</h4>
          <ul className="text-sm space-y-2">
            <li>Inicio</li>
            <li>Lista de Boletos</li>
            <li>Verificar mis Boletos</li>
            <li>Preguntas Frecuentes</li>
          </ul>
        </div>

        {/* CONTACTO */}
        <div>
          <h4 className="font-semibold text-lg mb-4">CONTACTO</h4>
          <ul className="text-sm space-y-2">
            <li>misitioweb.com</li>
            <li>Colombia</li>
            <li>+57 3103103101</li>
          </ul>
        </div>

        {/* SÍGUENOS */}
        <div>
          <h4 className="font-semibold text-lg mb-4">SÍGUENOS</h4>
          <div className="flex space-x-4 items-center">
            <Image src="/assets/icons/logo/instagram.svg" alt="Instagram" width={24} height={24} />
            <Image src="/assets/icons/logo/facebook.svg" alt="Facebook" width={24} height={24} />
          </div>
        </div>
      </div>
    </footer>
  );
}
