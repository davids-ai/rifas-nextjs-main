import Link from 'next/link';
import Image from 'next/image';

interface LegalPageProps {
  title: string;
  description: string;
}

export function LegalPage({ title, description }: LegalPageProps) {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-white text-gray-800">
      <Link href="/" className="mb-6">
        <Image src="/assets/icons/logo.svg" alt="Logo" width={120} height={60} priority />
      </Link>

      <h1 className="text-2xl font-semibold mb-4 text-center">{title}</h1>
      <p className="text-center max-w-2xl text-gray-600">{description}</p>
    </main>
  );
}
