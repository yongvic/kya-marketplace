import { getDummyPosts } from '@/lib/dummy-data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import BackButton from '@/components/user/blog/BackButton';

type Props = {
    params: {
        slug: string;
        locale: string;
    };
};

// Génère les chemins statiques pour toutes les langues et tous les articles
export async function generateStaticParams({params: {locale}}: {params: {locale: string}}) {
    const t = await getTranslations('BlogPage');
    const allPosts = getDummyPosts(t);

    return allPosts.map(post => ({
        slug: post.slug,
    }));
}

// Génère les métadonnées dynamiques
export async function generateMetadata({ params: { locale, slug } }: Props) {
    const t = await getTranslations({ locale, namespace: 'BlogPage' });
    const allPosts = getDummyPosts(t);
    const post = allPosts.find(p => p.slug === slug);

    if (!post) {
        return {
            title: 'Post Not Found'
        };
    }

    return {
        title: post.title,
        description: post.excerpt,
    };
}

// Page du blog
export default function BlogPostPage({ params }: Props) {
    unstable_setRequestLocale(params.locale);
    const t = useTranslations('BlogPage');
    
    const allPosts = getDummyPosts(t);
    const post = allPosts.find(p => p.slug === params.slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="bg-white">
            <div className="max-w-4xl mx-auto py-16 md:py-24 px-4 sm:px-6 lg:px-8">
                <BackButton />
                <article>
                    <header className="mb-12 text-center">
                        <p className="text-kya-green font-semibold mb-2">{post.category}</p>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
                            {post.title}
                        </h1>
                        <div className="mt-6 flex justify-center items-center gap-4">
                            <div className="relative w-12 h-12 rounded-full overflow-hidden">
                                <Image src={post.author.avatarUrl} alt={post.author.name} fill className="object-cover" />
                            </div>
                            <div>
                                <p className="font-bold text-gray-800">{post.author.name}</p>
                                <p className="text-sm text-gray-500">{post.date}</p>
                            </div>
                        </div>
                    </header>

                    <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-12 shadow-lg">
                        <Image src={post.imageUrl} alt={post.title} fill className="object-cover" priority />
                    </div>

                    <div className="prose prose-lg max-w-none mx-auto text-gray-700">
                        <p>{post.excerpt}</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                        <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Curitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.</p>
                        <p>{post.excerpt}</p>
                    </div>
                </article>
            </div>
        </div>
    );
}
