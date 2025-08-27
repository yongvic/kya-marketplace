// import { useTranslations } from 'next-intl';
import PubSection from '@/components/user/pub-section';
import ClientSection from '@/components/user/client-section';

export default function HomePage() {
  // const t = useTranslations('HomePage');
  return (
    <>
      <PubSection/>
      <ClientSection/>
    </>
  )
  
  
}