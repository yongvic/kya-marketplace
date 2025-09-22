// src/app/[locale]/(site web)/logiciels/resources/page.tsx
import ResourcesClientPage from './ResourcesClientPage';
import { getResourcesData } from '@/lib/resources-data';
import { getTranslations } from 'next-intl/server';

export default async function ResourcesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('ResourcesData');
  
  // La fonction getResourcesData attend maintenant une fonction de traduction
  const { resources, categories } = getResourcesData(t);

  return (
    <ResourcesClientPage
      resources={resources}
      categories={categories}
      locale={locale}
    />
  );
}
