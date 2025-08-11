import Link from 'next/link';
import Image from 'next/image';
import { ReactNode } from 'react';
import '../../../styles/dashboard.css';
import { Sidebar } from '@/components/dashboard/layout/sidebar';
import { SidebarUserInfo } from '@/components/dashboard/layout/sidebar-user-info';
import { Footer } from '@/components/home/footer/footer';
import { MobileSidebar } from '@/components/dashboard/layout/mobile-sidebar';

interface Props {
  children: ReactNode;
}

export function DashboardLayout({ children }: Props) {
  return (
    <div className="min-h-screen flex flex-col w-full relative">
      {/* Barra horizontal superior */}
      <header className="flex items-center justify-between px-6 py-4 bg-[#1570EF] text-white shadow-md">
        {/* Mobile menu trigger - Visible solo en mobile */}
        <div className="md:hidden">
          <MobileSidebar />
        </div>

        {/* Logo a la izquierda */}
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Image src="/assets/icons/logo-white.svg" alt="AeroEdit" width={100} height={100} />
        </Link>

        {/* Navegación horizontal - Visible solo en desktop */}
        <nav className="hidden md:flex gap-6 items-center">
          <Sidebar />
        </nav>

        {/* Info de usuario al final */}
        <SidebarUserInfo />
      </header>

      {/* Contenido principal */}
      <main className="flex-1 px-6 py-4 bg-[#f8fafc]">{children}</main>

      {/* Footer estático al final */}
      <footer className="w-full bg-[#f8fafc]">
        <Footer />
      </footer>

      {/* Botón flotante de WhatsApp */}
      <a
        href="https://wa.me/573103103101?text=Hola,%20necesito%20ayuda%20con%20la%20plataforma"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: 'fixed',
          right: '24px',
          bottom: '24px',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: '#25D366',
          color: 'white',
          borderRadius: '32px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          padding: '8px 16px',
          textDecoration: 'none',
          fontWeight: 'bold',
          fontSize: '16px',
        }}
      >
        <Image
          src="/assets/icons/icono-wp.svg"
          alt="WhatsApp"
          width={32}
          height={32}
          style={{ display: 'inline-block' }}
        />
        ¿Necesitas ayuda?
      </a>
    </div>
  );
}
