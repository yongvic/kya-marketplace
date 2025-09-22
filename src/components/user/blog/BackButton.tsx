'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { ArrowLeft } from 'lucide-react';

export default function BackButton() {
  const router = useRouter();
  const t = useTranslations('BlogPage');

  return (
    <button
      onClick={() => router.back()}
      className="inline-flex items-center gap-2 text-gray-600 hover:text-kya-green font-semibold transition-colors mb-8"
    >
      <ArrowLeft size={20} />
      {t('backButton')}
    </button>
  );
}