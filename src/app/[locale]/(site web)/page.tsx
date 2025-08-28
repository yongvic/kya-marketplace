// import { useTranslations } from 'next-intl';
import PubSection from '@/components/user/pub-section';
import ClientSection from '@/components/user/client-section';
import CategorieLogiciel from '@/components/user/categorie-logiciel';
import FeatureListSection from '@/components/user/feauture-liste-section';
import UserTestimonials from '@/components/user/testimonials';
import CtaSection from '@/components/user/cta-section';

export default function HomePage() {
  // const t = useTranslations('HomePage');
  return (
    <>
      <PubSection />
      <ClientSection />
      <CategorieLogiciel />
      <FeatureListSection />
      <CtaSection />
      <UserTestimonials />
    </>
  )


}