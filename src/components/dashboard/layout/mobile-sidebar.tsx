import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { Sidebar } from '@/components/dashboard/layout/sidebar';
import { SidebarUserInfo } from '@/components/dashboard/layout/sidebar-user-info';

export function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Abrir menú</span>
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="flex flex-col h-full p-0 bg-[#1570EF] text-white">
        {/* Scroll interno para que se vean todas las opciones */}
        <div className="flex flex-col flex-1 overflow-auto">
          <SheetHeader className="p-4">
            <SheetTitle className="text-lg font-semibold">Menú</SheetTitle>
            <SheetDescription className="sr-only">Navega entre las diferentes secciones</SheetDescription>
          </SheetHeader>

          {/* Opciones */}
          <nav className="flex flex-col gap-2 px-4">
            <Sidebar />
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}
