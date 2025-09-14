import {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  // ... autres configurations que vous pourriez avoir

  // On ajoute la configuration des images ici
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**', // Autorise tous les chemins sur unsplash
      },
      {
        protocol: 'https' ,
        hostname: 'i.pravatar.cc',
        port: '',
        pathname: '/**', // Autorise tous les chemins sur pravatar
      },
    ],
  },
};
 
export default withNextIntl(nextConfig);