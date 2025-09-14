export interface Post {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  category: string;
  author: {
    name: string;
    avatarUrl: string;
  };
  date: string;
  views: number;
  likes: number;
}