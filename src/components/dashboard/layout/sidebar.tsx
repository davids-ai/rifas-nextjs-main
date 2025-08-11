'use client';

import { Album, CreditCard, Home } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useUserInfo } from '@/hooks/useUserRole';
import { createClient } from '@/utils/supabase/client';

const supabase = createClient();

export function Sidebar() {
  const { role, loading } = useUserInfo(supabase);
  const pathname = usePathname();

  if (loading) return null;

  const baseItems = [
    {
      title: 'Tablero Informativo',
      icon: <Home className="h-5 w-5" />,
      href: '/dashboard',
    },
    {
      title: 'Mis Boletos',
      icon: <Album className="h-5 w-5" />,
      href: '/dashboard/boletos',
    },
    {
      title: 'Rifas',
      icon: <Album className="h-5 w-5" />,
      href: '/dashboard/rifas',
    },
  ];

  const adminItems = [
    {
      title: 'Agregar Rifa',
      icon: <CreditCard className="h-5 w-5" />,
      href: '/dashboard/agregar_rifa',
    },
    {
      title: 'Pagos',
      icon: <CreditCard className="h-5 w-5" />,
      href: '/dashboard/pagos',
    },
    {
      title: 'Asignar Ganador',
      icon: <CreditCard className="h-5 w-5" />,
      href: '/dashboard/asignar_ganador',
    },
  ];

  const sidebarItems = [...baseItems, ...(role === 'admin' ? adminItems : [])];

  // Retornamos un Fragmento para que el padre decida el layout
  return (
    <>
      {sidebarItems.map((item) => (
        <Link
          key={item.title}
          href={item.href}
          className={cn(
            'flex items-center gap-2 px-2 py-1 text-sm font-medium transition',
            // Estilos del link por defecto
            'text-white hover:text-blue-300',
            // Estilos del link activo
            {
              'text-blue-300 font-semibold':
                item.href === '/dashboard' ? pathname === item.href : pathname.includes(item.href),
            },
          )}
        >
          {item.icon}
          {item.title}
        </Link>
      ))}
    </>
  );
}
