import Link from 'next/link';
import { User } from '@supabase/supabase-js';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

interface Props {
  user: User | null;
}

export default function Header({ user }: Props) {
  return (
    <nav>
      <div className="mx-auto max-w-7xl relative px-[32px] py-[18px] flex items-center justify-between">
        <div className="flex flex-1 items-center justify-start">
          <Link className="flex items-center" href={'/'}>
            <Image className="w-auto block" src="/logo.svg" width={131} height={28} alt="AeroEdit" />
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end">
          <div className="flex space-x-4">
            <Button asChild={true} variant={'ghost'}>
              <Link href={'/'}>Inicio</Link>
            </Button>
            <Button asChild={true} variant={'ghost'}>
              <Link href={'/rifas'}>Rifas</Link>
            </Button>
            <Button asChild={true} variant={'ghost'}>
              <Link href={'/boletos'}>Boletos</Link>
            </Button>
            {user?.id ? (
              <Button variant={'secondary'} asChild={true}>
                <Link href={'/dashboard'}>Panel de Rifas</Link>
              </Button>
            ) : (
              <Button asChild={true} variant={'secondary'}>
                <Link href={'/login'}>Ingresar / Admin</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
