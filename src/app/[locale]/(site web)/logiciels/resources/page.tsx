import ResourcesClientPage from './ResourcesClientPage';
import { getResourcesData } from '@/lib/resources-data';

export default async function ResourcesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; // ✅ attendre params
  const { resources, categories } = getResourcesData(locale);

  return (
    <ResourcesClientPage
      resources={resources}
      categories={categories}
      locale={locale}
    />
  );
}
