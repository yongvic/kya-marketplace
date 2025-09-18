import HeroSection from "@/components/user/logiciels/heroSection";
import FeaturesSection from "@/components/user/logiciels/featuresSection";
import ResourcesSection from "@/components/user/logiciels/resourcesSection";
import Testimonials from '@/components/user/logiciels/Testimonials';
import TarifsSection from '@/components/user/logiciels/taifs-section';
import ClientSection from '@/components/user/client-section';

export default function LogicielsPage() {
    return (
        // Le layout parent gère déjà le padding et le header, nous n'avons donc besoin que des sections.
        <>
            <HeroSection />
            <FeaturesSection />
            <TarifsSection />
            <ResourcesSection />
            <ClientSection />
            <Testimonials />
        </>
    );
}