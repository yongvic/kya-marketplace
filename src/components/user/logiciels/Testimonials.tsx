"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaStar } from 'react-icons/fa';

// Définition du type pour un objet témoignage
interface Testimonial {
    name: string;
    title: string;
    image: string;
    rating: number;
    comment: string;
}

// Données des témoignages
const testimonialsData: Testimonial[] = [
    {
        name: 'Jean Dupont',
        title: 'Propriétaire de maison, Paris',
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto-format&fit=crop',
        rating: 5,
        comment: "L'installation de panneaux solaires par cette équipe a été un véritable jeu d'enfant. Non seulement je réduis ma facture d'électricité, mais je contribue aussi à un avenir plus vert. Un service impeccable et professionnel !",
    },
    {
        name: 'Marie Claire',
        title: 'Gérante d\'une PME',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop',
        rating: 5,
        comment: "Passer à l'énergie solaire pour mon entreprise était une décision stratégique. L'équipe a su me conseiller et optimiser l'installation pour un rendement maximal. Je suis ravie des économies réalisées et de notre image éco-responsable.",
    },
    {
        name: 'Lucas Martin',
        title: 'Agriculteur',
        image: 'https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2071&auto-format&fit=crop',
        rating: 5,
        comment: "Grâce à leurs solutions solaires, mon exploitation est devenue quasi autonome en énergie. La fiabilité du système, même par temps couvert, est impressionnante. Un investissement que je recommande à tous mes confrères.",
    },
    {
        name: 'Sophie Dubois',
        title: 'Architecte',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto-format&fit=crop',
        rating: 5,
        comment: "J'ai intégré leurs solutions dans plusieurs de mes projets de construction durable. Leur expertise technique et la qualité des panneaux sont irréprochables. Un partenaire de confiance pour l'avenir.",
    },
];

const Testimonials: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            const nextIndex = (currentIndex + 1) % testimonialsData.length;
            setCurrentIndex(nextIndex);
        }, 5000);

        return () => {
            clearTimeout(timer);
        };
    }, [currentIndex]);

    const activeTestimonial = testimonialsData[currentIndex];

    return (
        <section className="relative bg-[#f99d32]">
            <div className="absolute top-0 w-full overflow-hidden leading-none">
                <svg
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1440 320"
                    preserveAspectRatio="none"
                    className="relative block w-full h-[100px] sm:h-[150px]"
                >
                    <path
                        fill="#ffffff"
                        fillOpacity="1"
                        d="M0,192L60,208C120,224,240,256,360,250.7C480,245,600,203,720,197.3C840,192,960,224,1080,250.7C1200,277,1320,299,1380,309.3L1440,320L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
                    ></path>
                </svg>
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
                <div className="text-center mb-12">
                    <span className="inline-block px-4 py-2 bg-white text-[#f99d32] text-sm font-semibold rounded-full mb-4">
                        Témoignages
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white">
                        Ce que nos clients disent de nos services
                    </h2>
                </div>

                <div className="flex flex-col items-center">
                    <div className="relative w-full max-w-3xl flex flex-col md:flex-row items-center bg-white rounded-2xl p-8 shadow-2xl">
                        <div className="w-full md:w-1/3 flex-shrink-0 mb-6 md:mb-0 md:mr-8">
                            <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden">
                                <Image
                                    key={currentIndex}
                                    src={activeTestimonial.image}
                                    alt={`Photo de ${activeTestimonial.name}`}
                                    fill={true}
                                    style={{ objectFit: 'cover' }}
                                    className="border-4 border-gray-200 shadow-xl animate-fade-in"
                                />
                            </div>
                        </div>

                        <div className="w-full md:w-2/3 text-center md:text-left">
                            <div className="flex justify-center md:justify-start mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <FaStar key={i} className="w-6 h-6 text-[#f99d32]" />
                                ))}
                            </div>

                            <blockquote className="text-lg text-gray-700 relative mb-5">
                                <span className="absolute -top-2 -left-4 text-8xl text-[#f99d32] font-serif opacity-25">“</span>
                                <p key={currentIndex} className="relative z-10 animate-fade-in-up">
                                    {activeTestimonial.comment}
                                </p>
                            </blockquote>

                            <div key={currentIndex} className="animate-fade-in-up" style={{ animationDelay: '150ms' }}>
                                <p className="font-bold text-gray-900 text-xl">{activeTestimonial.name}</p>
                                <p className="text-gray-600 font-semibold">{activeTestimonial.title}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center items-center gap-4 mt-10">
                        <span className="text-sm font-semibold text-white mr-2">Clients satisfaits :</span>
                        {/* LIGNE CORRIGÉE ICI */}
                        {testimonialsData.map((testimonial: Testimonial, index: number) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`relative w-12 h-12 rounded-full cursor-pointer overflow-hidden transition-all duration-300 ease-in-out focus:outline-none ${currentIndex === index ? 'ring-4 ring-white ring-offset-2 ring-offset-[#f99d32] scale-110' : 'hover:scale-110'
                                    }`}
                                aria-label={`Voir le témoignage de ${testimonial.name}`}
                            >
                                <Image
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    fill={true}
                                    style={{ objectFit: 'cover' }}
                                />
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;