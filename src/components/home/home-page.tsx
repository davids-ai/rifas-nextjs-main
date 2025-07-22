'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useUserInfo } from '@/hooks/useUserInfo';
import '../../styles/home-page.css';
import Header from '@/components/home/header/header';
import { HeroSection } from '@/components/home/hero-section/hero-section';
import { AboutUsSection } from '@/components/home/aboutus/aboutus-section';
import { HomePageBackground } from '@/components/gradients/home-page-background';
import { Footer } from '@/components/home/footer/footer';

export function HomePage() {
  const supabase = createClient();
  const { user } = useUserInfo(supabase);
  const [country, setCountry] = useState('US');

  return (
    <>
      <div className="relative min-h-screen flex flex-col">
        <HomePageBackground />
        <Header user={user} />
        <main className="flex-grow">
          <HeroSection />
          <AboutUsSection />
        </main>
        <Footer />
      </div>
    </>
  );
}
