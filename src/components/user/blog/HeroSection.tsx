import { Post } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import ArrowIcon from "./ArrowIcon";
import { useTranslations } from "next-intl";

export default function HeroSection({ latestPost, topReads }: { latestPost: Post, topReads: Post[] }) {
    const t = useTranslations('BlogPage');
    return (
        <section className="grid lg:grid-cols-2 gap-12 ">
            {/* Main featured post, taking up the left column. */}
            <div className="hero-main-post space-y-5 cursor-pointer group">
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-lg">
                    <Image src={latestPost.imageUrl} alt={latestPost.title} fill sizes="100vw" className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out" priority />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 group-hover:text-kya-green transition-colors duration-300">{latestPost.title}</h2>
                <p className="text-gray-600">{latestPost.excerpt}</p>
                <span className="font-bold text-kya-green flex items-center gap-2">
                    {t('continueReading')} <ArrowIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
            </div>
            {/* Sidebar-style list of top-read articles. */}
            <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-800">{t('topReads')}</h3>
                {topReads.map((post) => (
                    <Link key={post.id} href={`/blog/${post.slug}`} className="hero-top-read-item flex items-center gap-4 group">
                        <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                            <Image src={post.imageUrl} alt={post.title} fill sizes="10vw" className="object-cover group-hover:scale-110 transition-transform duration-300" />
                        </div>
                        <div>
                            <p className="font-bold text-gray-800 group-hover:text-kya-green transition-colors duration-300">{post.title}</p>
                            <p className="text-sm text-gray-500">{post.date}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}