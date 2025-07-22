import Link from 'next/link';
import Image from 'next/image';
import { ReactNode } from 'react';
import '../../../styles/dashboard.css';
import { Sidebar } from '@/components/dashboard/layout/sidebar';
import { SidebarUserInfo } from '@/components/dashboard/layout/sidebar-user-info';

interface Props {
  children: ReactNode;
}

export function DashboardLayout({ children }: Props) {
  return (
    <div className="min-h-screen flex flex-col w-full">
      {/* Barra horizontal superior */}
      <header className="flex items-center justify-between px-6 py-4 bg-[#1570EF] text-white shadow-md">
        {/* Logo a la izquierda */}
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Image src="/assets/icons/logo.svg" alt="AeroEdit" width={100} height={100} />
        </Link>

        {/* Navegación horizontal */}
        <Sidebar />

        {/* Info de usuario al final */}
        <SidebarUserInfo />
      </header>

      {/* Contenido principal */}
      <main className="flex-1 px-6 py-4 bg-[#f8fafc]">
        {children}
      </main>
    </div>
  );
}