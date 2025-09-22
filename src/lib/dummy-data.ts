import { Post } from './types';

// Define a type for the translation function passed from a next-intl hook.
type Translator = (key: string) => string;

/**
 * Generates an array of dummy blog post data for development and testing.
 * @param t - The translation function from `useTranslations`.
 * @returns An array of internationalized `Post` objects.
 */
export const getDummyPosts = (t: Translator): Post[] => [
  {
    id: 1,
    slug: 'le-futur-brillant-de-lenergie-solaire',
    title: t('posts.post1.title'),
    excerpt: t('posts.post1.excerpt'),
    imageUrl: '/images.jpeg',
    category: t('categories.solar'),
    author: { name: 'Dr. Eva Lerois', avatarUrl: 'https://i.pravatar.cc/150?u=eva' },
    date: '12 Septembre, 2025',
    views: 1200,
    likes: 250,
  },
  // ... (rest of the dummy data)
];