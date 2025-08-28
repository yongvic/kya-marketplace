"use client";

import React from 'react';
import { useTranslations } from 'next-intl';
import Button from '../button'; // Assurez-vous que le chemin est correct
import {
    Tv2,
    Lightbulb,
    NotepadText,
    ShieldAlert,
    UserLock,
    Database,
    SlidersHorizontal,
    Download
} from 'lucide-react';

// Le type et les données restent les mêmes
type Feature = {
    id: string;
    icon: React.ElementType;
    colorClasses: { base: string; hover: string; };
    titleKey: string;
    descriptionKey: string;
};

const featureData: Feature[] = [
    // ... (les 8 objets de featureData restent les mêmes)
    { id: 'monitoring', icon: Tv2, colorClasses: { base: 'bg-teal-100 text-teal-600', hover: 'group-hover:bg-teal-600 group-hover:text-white' }, titleKey: 'features.monitoring.title', descriptionKey: 'features.monitoring.description' },
    { id: 'management', icon: Lightbulb, colorClasses: { base: 'bg-yellow-100 text-yellow-600', hover: 'group-hover:bg-yellow-500 group-hover:text-white' }, titleKey: 'features.management.title', descriptionKey: 'features.management.description' },
    { id: 'reporting', icon: NotepadText, colorClasses: { base: 'bg-orange-100 text-orange-600', hover: 'group-hover:bg-orange-500 group-hover:text-white' }, titleKey: 'features.reporting.title', descriptionKey: 'features.reporting.description' },
    { id: 'alerts', icon: ShieldAlert, colorClasses: { base: 'bg-green-100 text-green-600', hover: 'group-hover:bg-green-600 group-hover:text-white' }, titleKey: 'features.alerts.title', descriptionKey: 'features.alerts.description' },
    { id: 'collaboration', icon: UserLock, colorClasses: { base: 'bg-rose-100 text-rose-600', hover: 'group-hover:bg-rose-500 group-hover:text-white' }, titleKey: 'features.collaboration.title', descriptionKey: 'features.collaboration.description' },
    { id: 'integration', icon: Database, colorClasses: { base: 'bg-blue-100 text-blue-600', hover: 'group-hover:bg-blue-600 group-hover:text-white' }, titleKey: 'features.integration.title', descriptionKey: 'features.integration.description' },
    { id: 'customization', icon: SlidersHorizontal, colorClasses: { base: 'bg-indigo-100 text-indigo-600', hover: 'group-hover:bg-indigo-500 group-hover:text-white' }, titleKey: 'features.customization.title', descriptionKey: 'features.customization.description' },
    { id: 'export', icon: Download, colorClasses: { base: 'bg-red-100 text-red-600', hover: 'group-hover:bg-red-500 group-hover:text-white' }, titleKey: 'features.export.title', descriptionKey: 'features.export.description' },
];

const FeatureItem = ({ feature, t }: { feature: Feature; t: (key: string) => string }) => (
    // ... (le code du FeatureItem reste le même)
    <div className="p-8"><div className="flex items-start gap-4"><div className={`flex-shrink-0 p-3 rounded-lg ${feature.colorClasses.base} ${feature.colorClasses.hover} transition-all duration-300 transform group-hover:scale-110 group-hover:shadow-lg group-hover:-rotate-6`}><feature.icon className="h-6 w-6" aria-hidden="true" /></div><div className="text-left"><h4 className="text-lg font-bold text-gray-900">{t(feature.titleKey)}</h4><p className="mt-1 text-gray-600">{t(feature.descriptionKey)}</p></div></div></div>
);

const FeatureListSection = () => {
    const t = useTranslations('FeatureListSection');

    return (
        // L'espacement pb-48 et le z-index sont conservés
        <section className="relative z-10 bg-white pt-16 sm:pt-24 pb-48">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-center max-w-5xl mx-auto border-t border-gray-200">
                    {featureData.map((feature) => (
                        <div key={feature.id} className={`w-full md:w-1/3 group cursor-pointer border-b border-gray-200 md:border-r md:[&:nth-child(3n)]:border-r-0 md:[&:nth-child(n+7)]:border-b-0`}>
                            <FeatureItem feature={feature} t={t} />
                        </div>
                    ))}
                </div>

                {/* 
                  MODIFICATION CLÉ: Le bouton est de retour ici.
                  - Le conteneur a un 'z-index' élevé pour passer AU-DESSUS de la vague verte.
                  - 'relative' est crucial pour que le z-index fonctionne.
                */}
                <div className="relative z-20 mt-16 text-center flex justify-center">
                    <Button className="text-white font-semibold py-3 px-8">
                        {t('cta')}
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default FeatureListSection;