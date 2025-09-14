'use client';

import { useState } from 'react';
import Header from '@/components/user/header';
import PubSection from '@/components/user/pub-section';
import ClientSection from '@/components/user/client-section';
import CategorieLogiciel from '@/components/user/categorie-logiciel';
import UserTestimonials from '@/components/user/testimonials';
import FeatureListSection from '@/components/user/feauture-liste-section';
import WelcomeAnimation from '@/components/WelcomeAnimation';
import SplashScreen from '@/components/SplashScreen';

export default function HomePage() {
  const [showSplash, setShowSplash] = useState(true);
  const [welcomeFinished, setWelcomeFinished] = useState(false);

  const handleSplashAnimationComplete = () => {
    setShowSplash(false);

    // --- CORRECTION APPLIQUÉE ICI ---
    // On retire "const welcomeTimer =" car la variable n'est pas utilisée.
    setTimeout(() => {
      setWelcomeFinished(true);
    }, 6000); // 3 secondes pour l'animation de bienvenue complète
  };

  return (
    <>
      {showSplash && <SplashScreen onAnimationComplete={handleSplashAnimationComplete} />}

      {!showSplash && !welcomeFinished && <WelcomeAnimation />}

      {!showSplash && welcomeFinished && (
        <>
          <header className="fixed top-0 left-0 w-full z-40">
            <Header />
          </header>
          <main>
            <PubSection />
            <ClientSection />
            <CategorieLogiciel />
            <FeatureListSection />
            <UserTestimonials />
          </main>
        </>
      )}
    </>
  );
}