"use client";

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ExternalLink, PlayCircle } from 'lucide-react';
import Image from 'next/image';

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5 } },
};

export default function ResourcesSection() {
    const t = useTranslations('LogicielsPage.resources');
    // Keys for fetching translated document links from the intl provider.
    const documents = ['link1', 'link2', 'link3', 'link4'];
    // Placeholder array for the video playlist.
    const videos = Array(4).fill(0);

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-6">
                {/* Main section title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5 }}
                    className="text-center"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900">{t('mainTitle')}</h2>
                    <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600">{t('subtitle')}</p>
                </motion.div>

                {/* Documents Section */}
                <div className="mt-16">
                    <motion.h3
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl font-bold text-gray-800"
                    >
                        {t('documents.title')}
                    </motion.h3>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4"
                    >
                        {documents.map(docKey => (
                            <motion.a
                                key={docKey}
                                href="#"
                                variants={itemVariants}
                                className="group flex items-center gap-2 text-lg text-gray-700 font-medium"
                            >
                                <span className="border-b-2 border-transparent group-hover:border-orange-500 transition-all duration-300">
                                    {t(`documents.${docKey}`)}
                                </span>
                                <ExternalLink
                                    size={20}
                                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                />
                            </motion.a>
                        ))}
                    </motion.div>
                </div>

                {/* Videos Section */}
                <div className="mt-20">
                    <motion.h3
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl font-bold text-gray-800"
                    >
                        {t('videos.title')}
                    </motion.h3>
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.8 }}
                        className="mt-8 flex flex-col md:flex-row gap-8"
                    >
                        {/* Main Featured Video */}
                        <a
                            href="/video.mp4"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full md:w-2/3 relative rounded-lg overflow-hidden group cursor-pointer"
                        >
                            <Image
                                src="/im.jpg" // Placeholder thumbnail image
                                alt="Vidéo principale"
                                width={1280}
                                height={720}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                <PlayCircle
                                    size={80}
                                    className="text-white transform transition-transform duration-300 group-hover:scale-110"
                                />
                            </div>
                        </a>

                        {/* Video Playlist */}
                        <div className="w-full md:w-1/3">
                            <h4 className="text-xl font-bold border-b-2 pb-2">{t('videos.playlistTitle')}</h4>
                            <div className="mt-4 space-y-4">
                                {videos.map((_, index) => (
                                    <a
                                        key={index}
                                        href="/video.mp4"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex gap-4 items-center cursor-pointer group"
                                    >
                                        <Image
                                            src="/im.jpg" // Placeholder thumbnail image
                                            alt={`Vidéo ${index + 1}`}
                                            width={150}
                                            height={84}
                                            className="rounded-md"
                                        />
                                        <div>
                                            <p className="font-semibold text-gray-800 group-hover:text-orange-500 transition-colors">
                                                {t('videos.videoTitle')}
                                            </p>
                                            <p className="text-sm text-gray-500">{t('videos.videoDate')}</p>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
