import { redirect } from "next/navigation";

export default function CallbackPage({ searchParams }: { searchParams: { [key: string]: string } }) {
  // Si hay error, redirige a la página de error
  if (searchParams?.error) {
    redirect("/error");
  }
  // Si no hay error, renderiza la página de éxito
  return null;
}
