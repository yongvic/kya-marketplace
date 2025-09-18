'use client';
import { useRef, useState } from 'react';
import { Post } from '@/lib/types';
import Image from 'next/image';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import ArrowIcon from './ArrowIcon';
import { useTranslations } from 'next-intl';

import Link from 'next/link';
import { useLocale } from 'next-intl';

const EyeIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
    </svg>
);

const HeartIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
);

export default function PostCard({ post, priority = false }: { post: Post; priority?: boolean; }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(post.likes);
    const t = useTranslations('BlogPage');
    const locale = useLocale();

    const handleLike = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent link navigation when liking
        e.stopPropagation();
        setIsLiked(!isLiked);
        setLikeCount(likeCount + (isLiked ? -1 : 1));
    };

    useGSAP(() => {
        const card = cardRef.current;
        if (!card) return;
        const image = card.querySelector('img');
        const arrow = card.querySelector('.arrow-icon');
        const tl = gsap.timeline({ paused: true, defaults: { duration: 0.4, ease: 'power2.out' } });
        tl.to(image, { scale: 1.05 })
            .to(arrow, { x: 5, color: '#f99d32' }, 0);

        card.addEventListener('mouseenter', () => tl.play());
        card.addEventListener('mouseleave', () => tl.reverse());
    }, { scope: cardRef });

    return (
        <Link href={`/${locale}/blog/${post.slug}`} passHref>
            <div ref={cardRef} className="post-card bg-white rounded-2xl shadow-sm overflow-hidden group cursor-pointer flex flex-col h-full">
                <div className="relative aspect-[16/10] overflow-hidden">
                    <Image src={post.imageUrl} alt={post.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-300" priority={priority} />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                    <p className="text-sm text-gray-500 mb-2">{post.category}</p>
                    <h3 className="text-xl font-bold text-gray-800 leading-tight mb-4 group-hover:text-kya-green transition-colors duration-300 flex-grow">{post.title}</h3>
                    <div className="flex items-center gap-4 mt-4">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden">
                            <Image src={post.author.avatarUrl} alt={post.author.name} fill className="object-cover" />
                        </div>
                        <div>
                            <p className="font-semibold text-gray-700">{post.author.name}</p>
                            <p className="text-sm text-gray-500">{post.date}</p>
                        </div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center text-gray-500">
                        <span className="font-semibold text-kya-green flex items-center gap-2">
                            {t('readArticle')} <ArrowIcon className="w-5 h-5 transition-transform duration-300 arrow-icon" />
                        </span>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                                <EyeIcon className="w-5 h-5" />
                                <span>{Intl.NumberFormat('fr-FR', { notation: 'compact' }).format(post.views)}</span>
                            </div>
                            <button onClick={handleLike} className={`flex items-center gap-1 transition-colors duration-200 ${isLiked ? 'text-red-500' : 'hover:text-red-500'}`}>
                                <HeartIcon className="w-5 h-5" />
                                <span>{Intl.NumberFormat('fr-FR', { notation: 'compact' }).format(likeCount)}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
