// import { useTranslations } from 'next-intl';
import PubSection from '@/components/user/pub-section';
import ClientSection from '@/components/user/client-section';
import CategorieLogiciel from '@/components/user/categorie-logiciel';
import UserTestimonials from '@/components/user/testimonials';
import FeatureListSection from '@/components/user/feauture-liste-section';
import Header from '@/components/user/header';

export default function HomePage() {
  // const t = useTranslations('HomePage');
  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50">
        <Header />
      </header>
      <PubSection />
      <ClientSection />
      <CategorieLogiciel />
      <FeatureListSection />
      <UserTestimonials />
    </>
  )


}